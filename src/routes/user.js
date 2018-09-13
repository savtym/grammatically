import express from 'express';
import condition from 'utils/condition';
import User from '../controllers/User';

const router = express.Router({});


router.route('/signup')
	.post(
		condition(['email', 'username', 'password', 'repeat_password']),
		User.signUpUser,
	);

router.route('/signin')
	.post(
		condition(['email', 'password']),
		User.signInUser,
	);


export default router;
