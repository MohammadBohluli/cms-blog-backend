import mongoose from "mongoose";
import { logger } from ".";
import appConfig from "../../config";

const connectToDb = async function () {
  const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = appConfig.database;

  try {
    await mongoose.connect(
      `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
    );
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectToDb;
