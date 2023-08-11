import Joi from 'joi';

export const loginBodySchema = Joi.object({
  login: Joi.string().min(3).max(255).required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .regex(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[\w!@#$%^&*\.]{8,}/,
    )
    .required(),
});
