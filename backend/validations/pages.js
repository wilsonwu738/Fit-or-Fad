const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validatePageInput = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('title must be between 3 and 100 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('description must be between 5 and 300 characters'),
    check('imageUrl')
      .exists({ checkFalsy: true })
      .withMessage('You must link an imageUrl'),
    handleValidationErrors
  ];
  
  module.exports = validatePageInput;

  
  