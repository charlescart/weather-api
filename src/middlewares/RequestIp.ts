/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable class-methods-use-this */
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';

type Ip = string | null;
export default class RequestIp implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    req.query.clientIp = getClientIp(req) as string | undefined;
    next();
  }
}
