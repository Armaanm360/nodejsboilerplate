import AbstractRouter from '../../abstract/abstract.router';
import MemberAuthController from '../controller/auth.member.controller';
import AuthValidator from './../utils/validator/auth.validator';

class MemberAuthRouter extends AbstractRouter {
  private authValidator = new AuthValidator();
  private memberController = new MemberAuthController();
  constructor() {
    super();
    this.callRouter();
  }
  private callRouter() {
    //register router
    this.router
      .route('/register')
      .post(
        this.authValidator.registrationMemberValidator(),
        this.memberController.registration
      );

    //login router
    this.router
      .route('/login')
      .post(this.authValidator.loginValidator(), this.memberController.login);

    //forget password
    this.router
      .route('/forget-password')
      .post(
        this.commonValidator.commonForgetPassInputValidation(),
        this.memberController.forgetPassword
      );
  }
}

export default MemberAuthRouter;
