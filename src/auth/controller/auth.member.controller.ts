import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import MemberAuthService from '../services/auth.member.service';
import { ILogin } from '../../common/types/commonTypes';

class MemberAuthController extends AbstractController {
  private memberAuthService = new MemberAuthService();
  constructor() {
    super();
  }

  public registration = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.memberAuthService.registrationService(req);
      res.status(code).json(data);
    }
  );

  // login
  public login = this.asyncWrapper.wrap(async (req: Request, res: Response) => {
    const { email, password } = req.body as ILogin;
    const { code, ...data } = await this.memberAuthService.loginService({
      email,
      password,
    });
    res.status(code).json(data);
  });
}

export default MemberAuthController;
