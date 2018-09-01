
const defaultValues = [
  [
    'savtym@gmail.com',
    'savtym',
    'admin',
    'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InF3ZXJ0eSIsImlhdCI6MTUyMjI0MzQ3M30.ZBPrfoudpTC4gLyg2pM07rEDUfqT-KlWPK7-0E5bSus',
    '$2a$10$PpbCvwiMz2LwfWe1fXwfcevfGXCWjoXK01KbfAIvfF9lkTNIpQBt.',
    '$2a$10$PpbCvwiMz2LwfWe1fXwfce',
  ],
  [
    'savtym1@asdfghj.com',
    'savtym1',
    'manager',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bTFAYXNkZmdoai5jb20iLCJ1c2VybmFtZSI6InNhdnR5bTEiLCJpYXQiOjE1MjM4OTgwNTF9.7H219EsJs1XfTp4kFVxQSb2AxKJha9z8PL_fGf0429A',
    '$2a$10$6rHLA.iSXu6GshCITIvQQO5xdSATFnQrOSxM5WJHupLjpu61Dh1me',
    '$2a$10$6rHLA.iSXu6GshCITIvQQO',
  ],
  [
    'savtym2@asdfghj.com',
    'savtym2',
    'user',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdnR5bTJAYXNkZmdoai5jb20iLCJ1c2VybmFtZSI6InNhdnR5bTIiLCJpYXQiOjE1MjQwNzEwMjR9.myGXVdOWqOq65etoQxYUv5CmDbjjfumxx0YyoS9fJNg',
    '$2a$10$Tfn4xqmZoKWBBO5aa081re1dyLWJ969f3amq4FExpdHTDbkTgbVTa',
    '$2a$10$Tfn4xqmZoKWBBO5aa081re',
  ],
];


exports.up = (db, callback) => db.createTable('users', {
  id: { type: 'int', primaryKey: true, autoIncrement: true },
  email: { type: 'string', notNull: true, unique: true },
  username: { type: 'string', notNull: true, unique: true },
  role: { type: 'string', notNull: true },
  token: { type: 'string', notNull: true },
  hash: { type: 'string', notNull: true },
  salt: { type: 'string', notNull: true },
}, () => {
  defaultValues.forEach((u) => {
    db.insert('users', ['email', 'username', 'role', 'token', 'hash', 'salt'], u, callback);
  });
});

exports.down = db => db.dropTable('users');
