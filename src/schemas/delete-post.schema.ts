import Joi from 'joi';

export const deletePostSchema = Joi.object({
  postId: Joi.string().length(24).required(),
});
