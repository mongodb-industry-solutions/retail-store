import dotenv, { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
import { PythonShell } from 'python-shell';

// Import path module from Node.js
import path from 'path';
import { fileURLToPath } from 'url';
import { type } from "os";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const EMBEDDING_FIELD_NAME = "embedding_desc_name_brand";
const DATABASE = "dotLocalStore";
const COLLECTION = "products";

const client = new MongoClient(process.env.ATLAS_URI);
console.log(" - Connecting to MongoDB Atlas...", process.env.ATLAS_URI);
const connection = await client.connect();
console.log(" - Connected to mdb");

//await vectorizeProducts();
//await clearEmbeddings();

// await client.close();

export async function vectorizeData(cursor, collection, fieldsToEmbed, embeddingFieldName) {
  console.log('vectorizeData')
  let promises = [];
  let counter = 1;

  while (!!(await cursor.hasNext())) {
    console.log('while start')
    // Run embedding requests in batches
    let docsToVectorize = [];
    for (let i = 0; i < 200; i++) { // batches of 200 documents
      docsToVectorize = [];
      for (let j = 0; j < 5; j++) { // we can get the embeddings of 5 documents a the time. Vertex AI allows you to generate 5 embeddings with one API call
        try {
          const document = await cursor.next();
          if (!document) continue
          //console.log('doc: ', document)
          docsToVectorize.push(document);
        } catch(error) {
          continue;
        }
      }

      if (docsToVectorize.length) {
        promises.push(
          vectorizeDocuments(docsToVectorize, collection, fieldsToEmbed, embeddingFieldName)
        );
      }
    }

    console.log(`Vectorizing batch No ${counter}`);
    await Promise.all(promises);

    promises = [];
    counter++;
  }

  return {promises, counter}
}

function vectorizeDocuments(documents, collection, fieldsToEmbed, embeddingFieldName) {
  return new Promise(async (resolve, _reject) => {
    let embeddings;
    try {

      const texts = documents
        .filter(document => !!document)
        .map(document => fieldsToEmbed.map((field) => document[field]).join(" "));

      embeddings = await getEmbeddings(texts);

      if (!embeddings) {
        return resolve();
      }
    } catch (error) {
      console.error(`vectorizeDocuments ERROR: ${error}`);
      return resolve();
    }

    for (let document of documents) {
      const embedding = embeddings?.shift();
      if (!embedding || !document) {
        continue;
      }

      await collection.updateOne(
        { _id: document._id },
        { $set: { [embeddingFieldName]: embedding } }
      )
      console.log('- update one: ', { _id: document._id },   { $set: { [embeddingFieldName]: embedding.length } })
    }

    return resolve();
  });
}

export async function getEmbeddings(text) {
  if (!text) {
    console.log(" - No text to embed");
    return;
  }

  const body = JSON.stringify({ text });

  // Call the Python function
  let options = {
      pythonPath: '/usr/bin/python3',
      //pythonPath: '../embedder/emb/bin/python3', 
      args: body, // Example argument passed to the Python script
      pythonOptions: ['-u'],
      verbose: true,
      scriptPath: path.join(__dirname, './../embedder')
  };
  let response = await PythonShell.run("embedder_function.py", options)
  try {
    response = JSON.parse(response[0])
    console.log(" - gc function args, ", body)
    console.log(" - gc function response status, ", response.status)
    console.log(" - gc function response, ", response.vectors.length)
    if (response.status !== 200) {
      console.error(response.error);
      throw new Error("Generating embeddings failed.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Parsing embeddings failed.");
  }

  return response?.vectors || [];
};

async function getCollection(databaseName, collectionName) {
  return connection.db(databaseName).collection(collectionName);
}

async function clearEmbeddings() {
  console.log('clearEmbeddings')
  const collection = await getCollection(DATABASE, COLLECTION);
  let res = await collection.updateMany(
    {},
    {
      $unset: { [EMBEDDING_FIELD_NAME]: 1 }
    }
  );
  console.log(res)
}
