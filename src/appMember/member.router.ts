import { Router } from 'express';
import ProfileRouter from './routers/profile.router';

class MemberRouter {
  public MemberRouter = Router();
  private ProfileRouter = new ProfileRouter();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.MemberRouter.use('/profile', this.ProfileRouter.router);
  }
  // profile router
}

export default MemberRouter;
