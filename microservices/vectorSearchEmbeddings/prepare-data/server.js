import dotenv from "dotenv";
import { connectToDatabase, closeDatabase } from "./connect.js";
import fs from "fs/promises";
import { vectorizeData } from "./create-embeddings.js";

dotenv.config();
const port = process.env.PORT;
const jsonFilePath = "/config/serviceAccountKey.json";
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

async function loadJson(filePath) {
  try {
    const data = await fs.readFile(process.cwd() + filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load and parse JSON file:", error);
    throw error;
  }
}
const EMBEDDING_FIELD_NAME = "text_embedding";
const FIELDS_TO_EMBED = [
    "description"
]

app.post("/generate_embeddings", async (req, res) =>  {
  console.log('Request Body:', req.body);
  console.log(req)
  if (!text) {
    console.log(" - No text to embed");
    return;
  }

  const body = JSON.stringify({ text });

  // Call the Python function
  let options = {
      //pythonPath: '/usr/bin/python3',
      pythonPath: '../embedder/emb/bin/python3', 
      args: body, // Example argument passed to the Python script
      pythonOptions: ['-u'],
      verbose: true,
      scriptPath: path.join(__dirname, './../embedder')
  };
  let response = await PythonShell.run("embedder_function.py", options)
  try {
    response = JSON.parse(response[0])
    console.log(" - gc function response status, ", response.status)
    if (response.status !== 200) {
      console.error(response.error);
      throw new Error("Generating embeddings failed.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Parsing embeddings failed.");
  }

  return response?.vectors || [];
});

app.get("/embedAllProducts", async (ctx) => {
    console.log('embedAllProducts')
  let db;
  try {
    db = await connectToDatabase();
    const collection = db.collection("products")//process.env.COLLECTION_NAME);

    const cursor = collection.aggregate([
        {
          $match: {
           // [EMBEDDING_FIELD_NAME]: { $eq: null }
          }
        },
        {
          $project: {
            "name": 1,
            "code": 1,
            "masterCategory": 1,
            "subCategory": 1,
            "articleType": 1,
            "baseColour": 1,
            "description": 1,
            "brand": 1
          }
        },
        {
          $limit: 100
        }
      ]);
    
      let result = await vectorizeData(
        cursor,
        collection,
        FIELDS_TO_EMBED,
        EMBEDDING_FIELD_NAME
      );

      console.log('hola')
      console.log(result)
    ctx.body = { suc: true };
    ctx.status = 200;
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.body = { error: "Failed to process request" };
    ctx.status = 500;
  } 
});

// TODO nice log for testing
async function main(){
    console.log('embedAllProducts')
    let db;
    try {
      db = await connectToDatabase();
      const collection = db.collection("products")//process.env.COLLECTION_NAME);
  
      const cursor = collection.aggregate([
          {
            $match: {}
          },
          {
            $project: {
              "name": 1,
              "code": 1,
              "masterCategory": 1,
              "subCategory": 1,
              "articleType": 1,
              "baseColour": 1,
              "description": 1,
              "brand": 1
            }
          },
          {
            $limit: 100
          }
        ]);
      
        let result = await vectorizeData(
          cursor,
          collection,
          FIELDS_TO_EMBED,
          EMBEDDING_FIELD_NAME
        );
  
        console.log('hola')
        console.log(result)

    } catch (error) {
      console.error("Error processing request:", error);
    } finally {
      if (db) {
        await closeDatabase();
      }
    }
}

app.get("/embedProduct", async (ctx) => {
    console.log('embedAllProducts')
  let db;
  try {
    db = await connectToDatabase();
    const collection = db.collection(process.env.DB_NAME);

    const cursor = null //one
      let result = await vectorizeData(
        cursor,
        collection,
        FIELDS_TO_EMBED,
        EMBEDDING_FIELD_NAME
      );

      console.log('hola')
      console.log(result)
    ctx.body = { suc: true };
    ctx.status = 200;
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.body = { error: "Failed to process request" };
    ctx.status = 500;
  } finally {
    // if (db) {
    //   await closeDatabase();
    // }
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});