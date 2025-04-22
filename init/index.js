const mongoose = require("mongoose");
const innerData = require("./data.js");
const Listing = require("../models/listing.js");
const fs = require("fs");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}
main();

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }
// const listings = fs.readFileSync(`${__dirname}/data.js`, "utf-8");

const importData = async () => {
  try {
    await Listing.create(innerData);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data Successfully Loaded");
  } catch (error) {
    console.error("Error importing data: ", error);
  }
};

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    // await Listing.insertMany(initData.data);
    // it creates new array of owner and inserted in initData
    innerData.data = innerData.data.map((obj) => ({
      ...obj,
      owner: "66c341572a7b6ad12a19bbc9",
    }));
    console.log("Inserting sample data...");
    await Listing.insertMany(innerData.data);
    console.log("data inserted");
  } catch (error) {
    console.error("Error initializing data: ", error);
  }
};

initDB();
importData();
