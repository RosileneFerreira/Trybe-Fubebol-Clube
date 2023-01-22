import Joi = require('joi');

import HttpException from '../../utils/http.exception';

const REQUIRED = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': REQUIRED,
    'string.empty': REQUIRED,
    'string.email': 'Incorrect email or password',
  }),
  password: Joi.string().min(7).required().messages({
    'any.required': REQUIRED,
    'string.empty': REQUIRED,
  }),
});

export default function loginValidation(login: object) {
  const { error, value } = loginSchema.validate(login, { convert: false });
  if (error) {
    throw new HttpException(400, error.message);
  }
  return { value };
}
