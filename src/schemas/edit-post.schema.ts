import Joi from 'joi';

export const editPostBodySchema = Joi.object({
  topic: Joi.string().min(10).max(64),
  text: Joi.string().min(10).max(1000),
});

export const editPostParamsSchema = Joi.object({
  postId: Joi.string().length(24).required(),
});
