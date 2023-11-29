import { Router } from 'express';
import MemberAuthRouter from './router/auth.member.router';

class AuthRouter {
  public AuthRouter = Router();
  private memberAuthRouter = new MemberAuthRouter();

  constructor() {
    this.callRouter();
  }
  private callRouter() {
    this.AuthRouter.use('/member', this.memberAuthRouter.router);
  }
}
export default AuthRouter;
