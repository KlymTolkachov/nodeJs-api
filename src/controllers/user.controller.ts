import { NextFunction, Request, Response } from 'express';
import { postService, userService } from '../services';
import { BaseController } from '../common/abstract/base.controller';
import {
  registerBodySchema,
  loginBodySchema,
  createPostSchema,
  showPostsParamsSchema,
  showPostsQuerySchema,
} from '../schemas';

export class UserController extends BaseController {
  constructor() {
    super();
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        handler: this.register,
        validators: {
          body: registerBodySchema,
        },
      },
      {
        path: '/login',
        method: 'post',
        handler: this.login,
        validators: {
          body: loginBodySchema,
        },
      },
      {
        path: '/:userId/posts',
        method: 'post',
        handler: this.createPost,
        validators: {
          body: createPostSchema,
        },
      },
      {
        path: '/:userId/posts',
        method: 'get',
        handler: this.showPosts,
        validators: {
          params: showPostsParamsSchema,
          query: showPostsQuerySchema,
        },
      },
    ]);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.addUser(req.body);
    res.send(user);
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;

    const user = await userService.userLogin(login, password);
    res.send(user);
  };

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { topic, text, userId } = req.body;

    const post = await postService.addPost(userId, topic, text);
    res.send(post);
  };

  showPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { take, skip } = req.query;
    const { userId } = req.params;

    const posts = await postService.showPosts(
      userId,
      Number(take),
      Number(skip),
    );
    res.send(posts);
  };
}

export const userController = new UserController();
