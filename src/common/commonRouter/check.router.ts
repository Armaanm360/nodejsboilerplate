import AbstractRouter from '../../abstract/abstract.router';
import checkController from './../commonController/checkController';

class checkRouter extends AbstractRouter {
  private checkController = new checkController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // this.router.route('/check').post(this.checkController.postCheckGo);
    this.router.route('/check').post(this.checkController.postcheckGo);
  }
}

export default checkRouter;
