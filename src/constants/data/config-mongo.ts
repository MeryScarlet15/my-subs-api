export const MONGO_CONFIG = {
  user: process.env.DB_USER,
  userPassword: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  type: process.env.DB_TYPE,
  params: process.env.DB_PARAMS,
};
