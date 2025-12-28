import { body, validationResult } from 'express-validator';

const requiredBody = [
  body().custom((value, { req }) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('Request body should not be empty');
    }
    return true;
  })
];

export default requiredBody;
