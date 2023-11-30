import { Router } from 'express';
import checkRouter from '../common/commonRouter/check.router';
import AuthRouter from '../auth/auth.router';
import commonRouter from '../common/commonRouter/common.router';
import AuthChecker from './../common/middleware/authChecker/authChecker';
import MemberRouter from '../appMember/member.router';

class RootRouter {
  public v1Router = Router();
  private simpleRouter = new checkRouter();
  private authRouter = new AuthRouter();
  private commonRouter = new commonRouter();
  private authChecker = new AuthChecker();
  private memberRouter = new MemberRouter();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    //auth router for memeber

    this.v1Router.use('/auth', this.authRouter.AuthRouter);

    //testing
    this.v1Router.use('/check', this.simpleRouter.router);

    //common
    this.v1Router.use('/common', this.commonRouter.router);

    // protected member router
    this.v1Router.use(
      '/member',
      this.authChecker.memberAuthChecker,
      this.memberRouter.MemberRouter
    );
  }
}

export default RootRouter;
