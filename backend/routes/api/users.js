const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const DEFAULT_PROFILE_IMAGE_URL = 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png';
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const singleFileUpload = require('../../awsS3.js')
const singleMulterUpload = require('../../awsS3.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /users"
  });
});

router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      DEFAULT_PROFILE_IMAGE_URL;
  const newUser = new User({
    username: req.body.username,
    profileImageUrl: profileImageUrl,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // return res.json({ user });
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    // return res.json({ user });
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl, 
    email: req.user.email
  });
});




module.exports = router;
