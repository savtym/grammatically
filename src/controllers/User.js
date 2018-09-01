import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../db/index';
import { GET_USER_DB, INSERT_USER_DB } from '../db/user';

const addSalt = '‘ß˚ç';


class User {
  /**
   * Sign up user
   * @param {Request} req, { email, username, password, repeat_password }
   * @param {Response} res
   * @return {object} token is string
   * */
  static async signUpUser({ body }, res) {
    let { err, rows } = await User.conditionUser(body);

    if (err) {
      res.status(400).json(err.message);
      return;
    }

    if (rows.length !== 0) {
      res.status(400).json(`This email ${body.email} is exist.`);
      return;
    }

    const { email, username, password } = body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password + addSalt, salt);
    const token = User.getToken(email, username, hash);

    ({ err, rows } = await db.query(INSERT_USER_DB, [email, username, token, hash, salt]));

    if (err) {
      res.status(400).json(err.message);
      return;
    }

    res.json({ token });
  }


  /**
   * Sign in user
   * @param {Request} req, {email, password}
   * @param {Response} res
   * */
  static async signInUser({ body: { password, email } }, res) {
    const { rows, err } = await db.query(GET_USER_DB, [email]);

    if (err) {
      return res.status(400).json({
        err: err.message,
      });
    }

    if (rows.length === 0) {
      return res.status(400).json(`This email ${email} isn't exist.`);
    }

    const [{
      hash,
      token,
      username,
    }] = rows;

    if (bcrypt.compareSync(password + addSalt, hash)) {
      return res.json({
        token,
        username,
      });
    }

    return res.status(400).json({
      err: 'Wrong password.',
    });
  }


  /**
   * Get token
   * @param {string} email
   * @param {string} username
   * @param {string} hash
   * @return {string} token
   * */
  static getToken(email, username, hash) {
    return jwt.sign({
      email,
      username,
    }, (
      process.env.JWT_SECRET + hash
      || `M7BUb2Oyhll2ciPsWKQw0KZPJ9CEoc9gcVpVb1uaVCVyHKTB9XiJs0BTngtep45${hash}`
    ));
  }


  /**
   * Condition user by params for sign up
   * @param {object} email
   * @param {string} username
   * @param {string} password
   * @param {string} repeat_password
   * @return {boolean|User}
   * */
  static async conditionUser({
    email,
    username,
    password,
    repeat_password: repeatPassword,
  }) {
    return new Promise((resolve) => {
      if (typeof (email) !== 'string'
        || !User.validateEmail(email)
        || typeof (username) !== 'string'
        || username.length < 6
        || typeof (password) !== 'string'
        || typeof (repeatPassword) !== 'string'
        || password !== repeatPassword
        || password.length < 8) {
        resolve({ err: { message: 'Name, email or pass are wrong' } });
      }

      resolve(db.query(GET_USER_DB('email'), [email]));
    });
  }


  /**
   * Validate email
   * @param {string} email
   * @return {boolean} check email by regex
   * */
  static validateEmail(email) {
    /* eslint-disable */
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		/* eslint-enable */
    return re.test(email);
  }
}


export default User;
