import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';

class checkService extends AbstractServices {
  constructor() {
    super();
  }
  public async checService(req: Request) {
    const { first_name, last_name, email } = req.body;

    console.log(req.body);

    const commonModel = this.Model.commonModel();
    await commonModel.insertCustomer({ first_name, last_name, email });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
    };
  }
}
export default checkService;
