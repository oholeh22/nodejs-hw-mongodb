import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': 'Please provide a valid email address',
  }),
  phoneNumber: Joi.string()
    .regex(/^\+[0-9]{3,20}$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain only + and digits and be between 3 and 20 characters',
      'any.required': 'Phone number is required',
    }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),

  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite must be a boolean',
  }),
  photo: Joi.string().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  phoneNumber: Joi.string()
    .regex(/^\+[0-9]{3,20}$/)
    .min(3)
    .max(20),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
  photo: Joi.string().optional(),
});
