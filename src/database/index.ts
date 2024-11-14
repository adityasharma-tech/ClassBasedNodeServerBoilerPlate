import "dotenv/config";
import {
  drizzle,
  NodePgDatabase,
} from "drizzle-orm/node-postgres";
import config from "../config";

export class DrizzleDB {
  db: NodePgDatabase;
  constructor () {
    this.db = this.initializeDb()
  }

  initializeDb() {
    return drizzle({
      connection: {
        connectionString: config.dbUrl,
        ssl: true,
      },
    });
  }
}
