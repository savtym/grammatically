import { GET_USER } from '../db/user';
import db from '../db/index';


const besidesParamsFromUser = [
	'salt',
	'hash',
];

export const permissions = roles => async (req, res, next) => {
	const { token } = req;

	if (!token) {
		return res.status(400).json({ err: 'Have a problem with token' });
	}

	const data = await db.query(
		GET_USER,
		[token],
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

	res.locals.user = Object.keys(user)
		.filter(key => !besidesParamsFromUser.includes(key))
		.reduce((p, key) => Object.assign(p, { [key]: user[key] }), {});

	return next();
};


export const d = '';
