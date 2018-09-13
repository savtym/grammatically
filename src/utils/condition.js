/* eslint-disable */
const map = {
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
	repeat_password: {
		type: 'string',
		func: (repeatPassword, { password }) => repeatPassword === password,
	},
};
/* eslint-enable */


export default rules => (req, res, next) => {
	let unCorrectParams = [];
	const params = req.body || {};

	const keys = Object.keys(params);
	const missParams = rules
		.filter(rule => (Array.isArray(rule)
			? !rule.some(r => keys.includes(r))
			: !keys.includes(rule)));

	if (missParams.length === 0) {
		unCorrectParams = keys.filter((key) => {
			if (map[key]) {
				return !(
					/* eslint valid-typeof: "error" */
					typeof (params[key]) === map[key].type
					|| (
						map[key].func
						&& map[key].func(params[key], params)
					)
				);
			}
			return false;
		});
	}

	if (missParams.length !== 0 || unCorrectParams.length !== 0) {
		let message;

		if (missParams.length !== 0) {
			const strParams = missParams
				.map(key => (Array.isArray(key)
					? key.join('/')
					: key))
				.join(', ');
			message = `${strParams} is/are missed params.`;
		} else {
			message = `${unCorrectParams.join(', ')} is/are wrong.`;
		}

		res.status(400).json({
			err: {
				message,
			},
		});
	} else {
		next();
	}
};
