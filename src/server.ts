import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import express from 'express';

const app = express();
app.set('trust proxy', true);

useExpressServer(app, {
  routePrefix: '/v1',
  cors: true,
  controllers: [`${__dirname}/features/**/*Controller.ts`],
});

export default app;
