import config from 'config';
import { GET_USER } from '../db/user';
import db from '../db/index';

export const permissions = roles => async (req, res, next) => {
  const { token } = req.body;
  if (!token || !token.startsWith(config.permissionsString)) {
    return res.status(400).json({ err: 'Have problem with token' });
  }

  const data = await db.query(
    GET_USER,
    [req.body.token.replace(config.permissionsString, '')],
  );

  if (data.err) {
    return res.status(500).json(data.err.message);
  }

  const { rows: [user] } = data;

  if (!user.id) {
    return res.status(401).json();
  }

  if (!roles.includes(user.role)) {
    return res.status(403).json();
  }

  return next(user);
};


export const d = '';
