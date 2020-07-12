/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';

type Ip = string | null;
export default class RequestIp implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    req.query.clientIp = getClientIp(req) as string | undefined;

    if (process.env.NODE_ENV === 'development') {
      // req.query.clientIp = '186.122.141.220'; // testing in local
    }

    next();
  }
}
