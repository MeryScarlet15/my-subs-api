import mongoose from "mongoose";
import { MONGO_CONFIG } from "../../constants/data/config-mongo";

const mongoAuth =
  MONGO_CONFIG.user && MONGO_CONFIG.userPassword ? `${MONGO_CONFIG.user}:${MONGO_CONFIG.userPassword}` : "";
const COMPLETE_URL = `${MONGO_CONFIG.type}://${mongoAuth}${MONGO_CONFIG.host}/${MONGO_CONFIG.database}${MONGO_CONFIG.params}`;

export const initDBConnection = () => {
  mongoose.Promise = global.Promise;

  return mongoose.connect(COMPLETE_URL, { useUnifiedTopology: true });
};
