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

    // Add owner before inserting
    const modifiedData = initData.data.map((obj) => ({
      ...obj,
      owner: "68809a8d5778074bcfb23dea",
    }));

    console.log("Inserting sample data...");
    await Listing.insertMany(modifiedData);
    console.log("Data inserted");
  } catch (error) {
    console.error("Error initializing data: ", error);
  }
};

initDB();
importData();
