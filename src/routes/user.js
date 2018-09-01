import express from 'express';
import { permissions } from 'utils/user';
import User from '../controllers/User';

const router = express.Router({});


router.route('/signup')
  .post(User.signUpUser);

router.route('/signin')
  .post(User.signInUser);


router.route('/test')
  .post(permissions(['admin']), (user, req, res) => {
		res.json(user)
	});

export default router;
