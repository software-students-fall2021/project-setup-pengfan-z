const JWT = require('jsonwebtoken');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const passport = require('passport');

const { User } = require('../db');
const passportConf = require('../passport');

const userRouter = Router();

// helper function
// server validation
const registerValidator = () => [
  body('username')
    .notEmpty()
    .withMessage('username is required')
    .not()
    .custom((val) => /[^A-za-z0-9\s]/g.test(val))
    .withMessage('Username not use unique characters'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be 8 characters'),
];

const signToken = (user) =>
  JWT.sign(
    {
      iss: 'smart-choice',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET
  );

userRouter.use(passport.initialize());
// register account
userRouter.post('/register', registerValidator(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Check if there is a user with same username
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(403).json({ message: 'username is already in use' });
  }

  // create a new user
  const newUser = new User({
    username,
    hash: password,
    comments: [],
    courses: [],
  });

  // save new user to the database
  await newUser.save();

  // generate token
  const token = signToken(newUser);

  //   return res.json({ message: 'user created success' });
  // respond with token
  return res.status(200).json({ token });
});

userRouter.post('/signin', passport.authenticate('local', { session: false }), async (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
});

userRouter.get('/secret', passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log('secret route');
  console.log('req', req);
  res.json({ message: 'secret route' });
});

// Grab the user's info based on the token
userRouter.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json({ user: req.user });
});

userRouter.post('/login', async (req, res) => {
  let userName = req.body.username;
  let passWord = req.body.password;
  // Find a user in the database with this particular username
  const user = await User.findOne({username: userName});
  if (!user) {
    return res.status(401).json({message: 'Invalid username'});
  }

  // Check if valid password
  const isValid = await user.isValidPassword(passWord);
  if (!isValid) {
    return res.status(401).json({message: 'Invalid password'});
  }

  // Generate token after username and password is validated
  const token = signToken(user);
  res.status(200).json({token, user});

});



module.exports = { userRouter };
