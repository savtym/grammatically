/* eslint-disable */
const keys = {
	email: {
		type: 'string',
		func: email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			.test(email),
	},
	username: {
		type: 'string',
		func: username => 5 < username.length,
	},
	password: {
		type: 'string',
		func: password => 7 < password.length,
	},
};
/* eslint-enable */


export default (user, { body }, res, next) => {
	const isOk = Object.keys(body).filter((key) => {
		if (keys[key]) {
			return !(
			/* eslint valid-typeof: "error" */
				typeof (body[key]) === keys[key].type
				|| (
					keys[key].func
					&& keys[key].func(body[key], body)
				)
			);
		}
		return false;
	});

	if (isOk) {
		next(user);
	} else {
		res.status(400).json({
			err: {
				message: 'Name, email or pass are wrong',
			},
		});
	}
};
