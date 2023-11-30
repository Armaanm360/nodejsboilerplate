import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';

class profileService extends AbstractServices {
  constructor() {
    super();
  }

  // change password
  // change password
  public async changePassword(req: Request) {
    const { old_password, new_password } = req.body;
    const { email, id } = req.member;
    const model = this.Model.memberModel();
    const checkUser = await model.checkUser({ email });

    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const password = checkUser[0].password;

    const verify = await Lib.compare(old_password, password);

    if (!verify) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: 'Previous password does not match!',
      };
    }

    const hashedPass = await Lib.hashPass(new_password);

    await model.updateUserMember({ password: hashedPass }, { id });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
    };
  }
}

export default profileService;
