import { MongoClient } from "mongodb";
import fs from "fs/promises";

// Replace these with your connection details
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function readDataFromFile() {
  try {
    const data = await fs.readFile("shampoo_products.json", "utf8");
    const parsedData = JSON.parse(data);

    // Ensure the data is an array of objects
    if (
      !Array.isArray(parsedData) ||
      !parsedData.every((item) => typeof item === "object" && item !== null)
    ) {
      throw new Error("Invalid data format: Expected an array of objects");
    }

    return parsedData;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

async function clearCollection() {
  const database = client.db("shampooDB");
  const collection = database.collection("shampoo_products");

  try {
    const result = await collection.deleteMany({});
    console.log("Existing records deleted:", result.deletedCount);
  } catch (err) {
    console.error("Error deleting records:", err);
  }
}

async function insertData(data) {
  const database = client.db("shampooDB");
  const collection = database.collection("shampoo_products");

  try {
    const result = await collection.insertMany(data);
    console.log("Data inserted successfully:", result);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

async function main() {
  await connectToDb();
  try {
    await clearCollection(); // Clear the collection before inserting new data
    const data = await readDataFromFile();
    await insertData(data);
  } catch (err) {
    console.error("Error in main function:", err);
  } finally {
    // After data processing, close the connection
    await client.close();
  }
}

main().catch(console.error);
