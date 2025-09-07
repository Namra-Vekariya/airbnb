const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Now required
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true, // Now required
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  try {
    if (listing) {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
  } catch (err) {
    console.error("Error deleting reviews after listing deletion:", err);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
