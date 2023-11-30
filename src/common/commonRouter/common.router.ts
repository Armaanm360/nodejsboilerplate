import AbstractRouter from '../../abstract/abstract.router';
import commonController from '../commonController/common.controller';
import checkController from './../commonController/checkController';

class commonRouter extends AbstractRouter {
  private commonController = new commonController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // this.router.route('/check').post(this.checkController.postCheckGo);

    this.router.post(
      '/send-email-otp',
      this.commonValidator.sendOtpInputValidator(),
      this.commonController.sendEmailOtpController
    );

    this.router.post(
      '/match-email-otp',
      this.commonValidator.matchEmailOtpInputValidator(),
      this.commonController.matchEmailOtpController
    );

    //change password

    this.router.post(
      '/change-password',
      this.commonValidator.commonChangePassInputValidation(),
      this.commonController.matchEmailOtpController
    );
  }
}

export default commonRouter;
