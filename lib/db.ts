import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;

export function getDbClient() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    return null;
  }

  if (!sqlClient) {
    sqlClient = neon(connectionString);
  }

  return sqlClient;
}

export function assertDbClient() {
  const sql = getDbClient();

  if (!sql) {
    throw new Error("Missing DATABASE_URL. Add your Neon connection string.");
  }

  return sql;
}
