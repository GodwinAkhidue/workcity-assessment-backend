import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  database: process.env.POSTGRESQL_DATABASE,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
});

export default pool;
