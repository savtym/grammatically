import express from 'express';
import User from '../controllers/User';

const router = express.Router({});


router.route('/signup')
  .post(User.signUpUser);

router.route('/signin')
  .post(User.signInUser);


export default router;
