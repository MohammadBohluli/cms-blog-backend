import config from "config";
import mongoose from "mongoose";

const connectToDb = async function () {
  const DB_URI = config.get<string>("dburi");

  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectToDb;
