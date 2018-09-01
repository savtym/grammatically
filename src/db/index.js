import { Pool } from 'pg';
import config from '../config/db.json';

const pool = new Pool(process.env.DATABASE_URL || config.dev);

export default {
  query: async (text, params) => new Promise(
    resolve => pool.query(
      text,
      params,
      (err, data = {}) => resolve(Object.assign({}, { err }, data)),
    ),
  ),
};
