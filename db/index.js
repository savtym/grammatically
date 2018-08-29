const config = require('../config/db.json');
const { Pool } = require('pg');

const pool = new Pool(process.env.DATABASE_URL || config.dev);

module.exports = {
  query: async (text, params) => {
    return new Promise(resolve =>
      pool.query(text, params, (err, data) => resolve(Object.assign({}, {err}, data))));
  }
};
