import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import commonService from '../commonService/common.service';

class commonController extends AbstractController {
  private commonService = new commonService();
  constructor() {
    super();
  }

  //send email otp
  public sendEmailOtpController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.commonService.sendOtpToEmailService(
        req
      );
      res.status(code).json(rest);
    }
  );

  // match email otp
  public matchEmailOtpController = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.commonService.matchEmailOtpService(
        req
      );

      res.status(code).json(data);
    }
  );
}

export default commonController;
