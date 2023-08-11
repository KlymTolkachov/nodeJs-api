import Joi from 'joi';

export const createPostSchema = Joi.object({
  topic: Joi.string().min(10).max(64).required(),
  text: Joi.string().min(10).max(1000).required(),
  userId: Joi.string().length(24).required(),
});
