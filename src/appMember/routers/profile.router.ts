import AbstractRouter from '../../abstract/abstract.router';
import MemberValidator from '../utils/validators/member.validator';
import ProfileController from './../controllers/profile.controller';

class ProfileRouter extends AbstractRouter {
  private validator = new MemberValidator();
  private profileController = new ProfileController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router
      .route('/change-password')
      .post(
        this.validator.changePassword(),
        this.profileController.changePassword
      );
  }
}

export default ProfileRouter;
