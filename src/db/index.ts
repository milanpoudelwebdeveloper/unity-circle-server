import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({});

export default {
  query: (text: string, params: any) => pool.query(text, params),
};
