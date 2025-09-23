import mongoose from "mongoose";
import config from "./config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(config.dbURI);
    console.log("Connection to database established");
  } catch (err) {
    console.error("Connection error in database. Erorr: ", err);
    process.exit(1);
  }
};