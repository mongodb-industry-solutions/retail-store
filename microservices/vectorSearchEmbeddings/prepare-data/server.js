import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import dotenv from "dotenv";
import { connectToDatabase, closeDatabase } from "./connect.js";
import fs from "fs/promises";
import { vectorizeData } from "./create-embeddings.js";

dotenv.config();
const port = process.env.PORT;
const jsonFilePath = "/config/serviceAccountKey.json";

const app = new Koa();
const router = new Router();

app.use(logger());

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

router.get("/embedAllProducts", async (ctx) => {
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

router.get("/embedProduct", async (ctx) => {
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

app.use(router.routes());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});