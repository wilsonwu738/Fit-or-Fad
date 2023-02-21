const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePageInput = [
    check('text')
      .exists({ checkFalsy: true })
      .withMessage('Page must be between 5 and 140 characters'),
    handleValidationErrors
  ];
  
  module.exports = validatePageInput;
  