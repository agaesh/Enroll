const { param, validationResult } = require('express-validator');

const RequiredId = [
  // Check the id param
  param('id')
    .notEmpty().withMessage('Instructor id is required')
    .isInt().withMessage('Instructor id must be an integer'),

  // Middleware to handle the validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next(); // Validation passed
  }
];

module.exports = RequiredId;
