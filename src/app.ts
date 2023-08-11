import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors-ts';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { userController, postController } from './controllers';
import { exceptionFilter } from './common/errors';

export class App {
  app = express();
  port = 8000;

  useRoutes() {
    this.app.use('/users', userController.router);
    this.app.use('/posts', postController.router);
  }

  useMiddleWare() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      morgan(':date[iso] ":method :url" :status :res[content-length]'),
    );
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  async initDb() {
    await mongoose.connect('mongodb://localhost:27017/api');

    console.log('Database connection established successfully');
  }

  async init() {
    this.useMiddleWare();
    this.useRoutes();
    await this.initDb();

    this.app.use(exceptionFilter.catch.bind(exceptionFilter));
    this.app.listen(this.port, () => {
      console.log(`Server is listening on http://localhost:${this.port}`);
    });

    process.on('uncaughtException', (err: Error) => {
      console.log('Uncaught error', err.message);
    });

    process.on('unhandledRejection', (err: Error) => {
      console.log('Uncaught ASYNC error', err.message);
    });
  }
}

(async () => {
  const app = new App();
  await app.init();
})();
