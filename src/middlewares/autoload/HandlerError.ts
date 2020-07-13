/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';

@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    const { body, query, params } = req;
    const response = {} as any;

    if (error.errors) {
      res.status(error.httpCode);
      response.msg = error.errors.map((e: any) => {
        const { property, constraints } = e;
        return { property, constraints };
      });
      response.error = error.name;
    } else {
      if (error instanceof HttpError && error.httpCode) res.status(error.httpCode);
      else res.status(500);

      if (error instanceof Error) {
        const developmentMode: boolean = process.env.NODE_ENV !== 'production';

        if (error.name && (developmentMode && error.message)) response.error = error.name;
        if (error.message) response.msg = error.message;
      } else if (typeof error === 'string') response.msg = error;
    }

    res.json({ entry: { body, query, params }, response });
    next();
  }
}
