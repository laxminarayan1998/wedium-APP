const mongoose = require("mongoose");

let client;

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URL);
    client = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`Successfully connected to MongoDB`);
  } catch (err) {
    console.log(`No Connection ` + err);
    process.exit(1);
  }
};

const getClient = () => {
  if (!client) {
    throw new Error("MongoDB client not initialized. Call connectDB first.");
  }
  return client;
};

module.exports = { connectDB, getClient };
