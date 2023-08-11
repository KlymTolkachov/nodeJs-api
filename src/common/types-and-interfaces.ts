import { Post } from '../models';
import { HttpError } from './errors';
import { NextFunction, Request, Response, Router } from 'express';

export type Posts = {
  total: number;
  data: Post[];
};

export interface IExceptionFilter {
  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void;
}

export interface IControllerRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  validators?: Validation;
}

export type Validation = Record<string, any>;

export type Socials = {
  facebook: string;
  instagram: string;
  twitter: string;
};
