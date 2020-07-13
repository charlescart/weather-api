/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';

export default class RequestIp implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    req.params.clientIp = getClientIp(req) || '';

    if (process.env.NODE_ENV === 'development' && req.params.clientIp === '::1') {
      req.params.clientIp = '186.122.141.220'; // testing in local
    }

    next();
  }
}
