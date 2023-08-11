import Joi from 'joi';

export const showPostsParamsSchema = Joi.object({
  userId: Joi.string().length(24).required(),
});

export const showPostsQuerySchema = Joi.object({
  take: Joi.string(),
  skip: Joi.string(),
});
