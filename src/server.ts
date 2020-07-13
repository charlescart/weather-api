import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import express from 'express';

const app = express();

useExpressServer(app, {
  defaultErrorHandler: false,
  routePrefix: '/v1',
  cors: true,
  controllers: [`${__dirname}/features/**/*Controller.ts`],
  middlewares: [`${__dirname}/middlewares/autoload/*.ts`],
});

export default app;
