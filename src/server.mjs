import config from "./../config.mjs";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const uri = config.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function readData() {
  const database = client.db("shampooDB");
  const collection = database.collection("shampoo_products");

  try {
    console.log(`Using collection: ${collection.collectionName}`);
    const products = await collection.find().toArray();
    // console.log("Products fetched from database:", products);
    return products;
  } catch (err) {
    console.error("Error reading data:", err);
    throw err;
  }
}

async function startServer() {
  await connectToDb();

  const app = express();
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.get("/api/products", async (req, res) => {
    console.log("Received request at /api/products");
    try {
      const products = await readData();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(console.error);
