import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import express from 'express';

const app = express();
// app.set('trust proxy', true);

useExpressServer(app, {
  defaultErrorHandler: false,
  routePrefix: '/v1',
  cors: true,
  controllers: [`${__dirname}/features/**/*Controller.ts`],
  middlewares: [`${__dirname}/middlewares/*.ts`],
});

export default app;
