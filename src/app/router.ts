import { Router } from 'express';

import checkRouter from '../common/commonRouter/check.router';
import AuthRouter from '../auth/auth.router';

class RootRouter {
  public v1Router = Router();
  private simpleRouter = new checkRouter();
  private authRouter = new AuthRouter();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    //auth router for memeber

    this.v1Router.use('/auth', this.authRouter.AuthRouter);

    this.v1Router.use('/common', this.simpleRouter.router);
  }
}

export default RootRouter;
