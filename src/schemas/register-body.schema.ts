import Joi from 'joi';

export const registerBodySchema = Joi.object({
  login: Joi.string().min(3).max(255).required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .regex(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[\w!@#$%^&*\.]{8,}/,
    )
    .required(),
  email: Joi.string().min(3).max(255).email().required(),
  avatar: Joi.string().min(3).max(255),
  firstName: Joi.string().min(3).max(255),
  lastName: Joi.string().min(3).max(255),
  socials: {
    facebook: Joi.string().min(3).max(255),
    instagram: Joi.string().min(3).max(255),
    twitter: Joi.string().min(3).max(255),
  },
  age: Joi.number().min(18).max(150).required(),
  interests: Joi.array().items(Joi.string()),
  address1: Joi.string().min(3).max(255).required(),
  address2: Joi.string().min(3).max(255),
  postIndex: Joi.binary().length(6),
});
