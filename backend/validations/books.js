const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateBookInput = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("title must be between 3 and 100 characters"),
  check("author").exists({ checkFalsy: true }),
  handleValidationErrors,
];

module.exports = validateBookInput;
