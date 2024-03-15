import pkg from 'pg'
const { Pool } = pkg
const pool = new Pool({})

export default {
  query: (text: string, params: string[]) => pool.query(text, params)
}
