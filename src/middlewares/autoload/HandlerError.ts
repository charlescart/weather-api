/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    const { body, query, params } = req;
    const response = {} as any;

    res.status(error.httpCode);
    response.msg = error.message;
    if (error.errors) {
      response.msg = error.errors.map((e: any) => {
        const { property, constraints } = e;
        return { property, constraints };
      });
    }


    response.error = error.name;

    res.json({ entry: { body, query, params }, response });
    next();
  }
}
