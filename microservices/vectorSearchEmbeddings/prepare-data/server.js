import dotenv from "dotenv";
import { connectToDatabase, closeDatabase } from "./connect.js";
import fs from "fs/promises";
import { vectorizeData } from "./create-embeddings.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PythonShell } from 'python-shell';
import { spawn } from 'child_process';

dotenv.config();
const port = process.env.PORT;
const jsonFilePath = "/config/serviceAccountKey.json";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    "description",
    "name",
    "season",
    "articleType",
    "brand",
    "baseColour"
]

app.post("/generate_embeddings", async (req, res) =>  {
  console.log('Request Body:', req.body);
  let {text} = req.body
  if (!text) {
    console.log(" - No text to embed");
    return;
  }

  const body = JSON.stringify({ text });

const pythonScript = path.join(__dirname, '../embedder/embedder_function.py');
  const args = [pythonScript, JSON.stringify({ text })];

  const pythonProcess = spawn('python3', args);

  let response = '';
  pythonProcess.stdout.on('data', (data) => {
    response += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Python Error:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Python script failed' });
    }
    try {
      const parsedResponse = JSON.parse(response);
      return res.json(parsedResponse);
    } catch (err) {
      console.error('Parsing Error:', err);
      return res.status(500).json({ error: 'Failed to parse response' });
    }
  });

  return response?.vectors || [];
});

async function embeddAllProducts () {
  let db;
  db = await connectToDatabase();
  const collection = db.collection("products")//process.env.COLLECTION_NAME);
  const count = await collection.countDocuments({});
  console.log("Total documents:", count);
  const cursor = collection.find(
      {},
      {
        projection: {
          "name": 1,
          "code": 1,
          "masterCategory": 1,
          "subCategory": 1,
          "articleType": 1,
          "baseColour": 1,
          "description": 1,
          "brand": 1,
          "season": 1
        }
      }
    ).limit(6000);
    let results = await cursor.toArray();
    console.log("Cursor Results:", results);
    let result = await vectorizeData(
      cursor,
      collection,
      FIELDS_TO_EMBED,
      EMBEDDING_FIELD_NAME
    );

    console.log('hola')
    console.log(result)

}
app.get("/embedAllProducts", async (ctx) => {
    console.log('embedAllProducts')
  try {
    embeddAllProducts()
    ctx.body = { suc: true };
    ctx.status = 200;
  } catch (error) {
    console.error("Error processing request:", error);
    ctx.body = { error: "Failed to process request" };
    ctx.status = 500;
  } 
});

// TODO nice log for testing
main()
async function main(){
  embeddAllProducts()
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
