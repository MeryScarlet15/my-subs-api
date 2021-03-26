import { createServer } from "./src/config/server/server";
import { createDBConnection } from "./src/config/db/db";

createServer(process.env.PORT || 4000);
