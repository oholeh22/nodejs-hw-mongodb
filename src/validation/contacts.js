import Joi from 'joi';

export const contactCreateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).required(),
  phone: Joi.string().min(3).max(20).required(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  phone: Joi.string().min(3).max(20),
}).min(1); 
