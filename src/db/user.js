export const GET_USER = 'SELECT * FROM users WHERE token = $1';
export const GET_USER_DB = 'SELECT * FROM users WHERE email = $1 OR username = $1';
export const INSERT_USER_DB = 'INSERT INTO users (email, username, token, hash, salt, role) VALUES ($1, $2, $3, $4, $5, $6)';
