import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../../../utils/lib/customEror';
import ValidationErr from '../../../utils/lib/validationError';
import AbstractServices from '../../../abstract/abstract.service';

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;

class Wrapper extends AbstractServices {
  // CONTROLLER ASYNCWRAPPER
  public wrap(cb: Func) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);

        // throw error if there are any invalid inputs
        console.log(errors.array());
        if (!errors.isEmpty()) {
          throw new ValidationErr(errors as any);
        }

        await cb(req, res, next);
      } catch (err: any) {
        // console.log({ err }, 'error');
        console.error('Error details:', err.detail);
        console.error('Error line:', err.line);
        console.error('Error stack:', err.stack);
        await this.createException(
          req.baseUrl,
          'Error from async wrapper',
          err.message,
          err.line
        );
        next(new CustomError(err.message, err.status, err.type));
      }
    };
  }
}

export default Wrapper;
