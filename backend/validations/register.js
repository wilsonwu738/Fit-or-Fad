const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateRegisterInput is a combination Express middleware that uses the 
// `check` middleware to validate the keys in the body of a request to 
// register a user
const validateRegisterInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 30 })
    .withMessage('Username must be between 5 and 30 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 25 })
    .withMessage('Password must be between 5 and 25 characters'),
  handleValidationErrors
];

module.exports = validateRegisterInput;