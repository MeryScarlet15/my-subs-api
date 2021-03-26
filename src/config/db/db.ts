import mongoose from "mongoose";

const DB_TYPE: string = "mongodb";
const DB_URL: string = "localhost:27017";
const DB_NAME: string = "meryHooks";
const COMPLETE_URL = `${DB_TYPE}://${DB_URL}/${DB_NAME}`;

const createDBConnection = () => {
  mongoose.Promise = global.Promise;

  return mongoose.connect(COMPLETE_URL, { useUnifiedTopology: true });
};

export default createDBConnection;
