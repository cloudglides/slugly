import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool;
let db: any;

function initPool() {
  if (pool) return;

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  db = drizzle(pool, { schema });
}

export function getDb() {
  if (!db) initPool();
  return db;
}

export { schema };

export default pool;
