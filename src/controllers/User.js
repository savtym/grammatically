import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

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
		const {
			email,
			username,
			password,
		} = body;

		const role = body.role || 'user';

		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(password + addSalt, salt);
		const token = jwt.sign(
			{ email, username },
			process.env.JWT_SECRET + hash || config.JWT + config,
		);

		const { err } = await db.query(
			INSERT_USER_DB,
			[email, username, token, hash, salt, role],
		);

		if (err) {
			return res.status(400).json({ err: err.detail });
		}

		return res.json({ token, role });
	}


	/**
   * Sign in user
   * @param {Request} req, {email, password}
   * @param {Response} res
   * */
	static async signInUser({ body }, res) {
		const { password, email: uniqueField } = body;
		const { rows, err } = await db.query(GET_USER_DB, [uniqueField]);

		if (err) {
			return res.status(400).json({ err: err.message });
		}

		if (rows.length === 0) {
			return res.status(400).json({ err: `This email/username [${uniqueField}] isn't exist.` });
		}

		const [{
			role,
			hash,
			token,
			email,
			username,
		}] = rows;

		if (bcrypt.compareSync(password + addSalt, hash)) {
			return res.json({
				role,
				token,
				email,
				username,
			});
		}

		return res.status(400).json({
			err: 'Wrong password.',
		});
	}
}


export default User;
