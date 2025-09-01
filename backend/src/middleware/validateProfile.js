const { body, validationResult } = require('express-validator');

const profileValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('skills').isArray().withMessage('Skills should be an array'),
  // Add more rules if needed, e.g., projects, work, links validation
];

const validateProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { profileValidationRules, validateProfile };
