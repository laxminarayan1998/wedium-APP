const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceAccount = require("./wedium-admin-firebase-adminsdk-av6bq-6e638b1c31.json");

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

const connectFirebase = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://wedium-admin.firebaseapp.com",
    });

    console.log(`Successfully connected to Firebase`);

    // const user = await admin.auth().getUser("CRqu3eMhJ5cbZp0dE5omcX0owJ32");
    // console.log("Firebase connected successfully. User data:", user.toJSON());
  } catch (err) {
    console.log(`Failed to connect to Firebase: ` + err);
    process.exit(1);
  }
};

const getClient = () => {
  if (!client) {
    throw new Error("MongoDB client not initialized. Call connectDB first.");
  }
  return client;
};

module.exports = { connectDB, getClient, connectFirebase };
