import { NextFunction, Request, Response } from 'express';
import { postService } from '../services';
import { BaseController } from '../common/abstract/base.controller';
import {
  deletePostSchema,
  editPostParamsSchema,
  editPostBodySchema,
} from '../schemas';

export class PostController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: '/:postId',
        method: 'patch',
        handler: this.editPost,
        validators: {
          params: editPostParamsSchema,
          body: editPostBodySchema,
        },
      },
      {
        path: '/:postId',
        method: 'delete',
        handler: this.deletePost,
        validators: {
          params: deletePostSchema,
        },
      },
    ]);
  }

  editPost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { topic, text } = req.body;

    const post = await postService.editPost(postId, topic, text);
    res.send(post);
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    await postService.deletePost(postId);
    res.end();
  };
}

export const postController = new PostController();
