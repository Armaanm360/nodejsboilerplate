import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';
import config from '../../config/config';
import { ILogin } from '../../common/types/commonTypes';
import { ILoginRes } from '../utils/types/admin.auth.types';

class MemberAuthService extends AbstractServices {
  //registration service
  public async registrationService(req: Request) {
    return this.db.transaction(async (trx) => {
      const { password, ...rest } = req.body;
      const memberModel = this.Model.memberModel(trx);

      //check user

      const checkUser = await memberModel.checkUser({
        email: rest.email,
        mobileNumber: rest.mobileNumber,
      });

      if (checkUser.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_BAD_REQUEST,
          message: 'Email is already exists',
        };
      }

      //password hashing
      const hashedPass = await Lib.hashPass(password);

      //creating member
      const registration = await memberModel.insertUserMember({
        password: hashedPass,
        ...rest,
      });

      //retrieve token data

      const tokenData = {
        id: registration[0].id,
        name: rest.name,
        country: rest.country,
        district: rest.district,
        facebook_link: rest.facebook_link,
        photo: null,
        status: 'applying',
        email: rest.email,
        emailVerification: false,
        mobileNumber: rest.mobileNumber,
        mobileNumberVerification: false,
      };

      const token = Lib.createToken(tokenData, config.JWT_SECRET_MEMBER, '24h');

      if (registration.length) {
        return {
          success: true,
          code: this.StatusCode.HTTP_OK,
          message: this.ResMsg.HTTP_OK,
          data: { ...tokenData },
          token,
        };
      } else {
        return {
          success: false,
          code: this.StatusCode.HTTP_BAD_REQUEST,
          message: this.ResMsg.HTTP_BAD_REQUEST,
        };
      }
    });
  }

  //login service
  // login
  public async loginService({ email, password }: ILogin): Promise<ILoginRes> {
    const memberModel = this.Model.memberModel();
    const checkUser = await memberModel.getSingleUser(email);

    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    console.log(checkUser.length);

    const { password: hashPass, ...rest } = checkUser[0];
    const checkPass = await Lib.compare(password, hashPass);

    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const tokenData = {
      id: rest.id,
      name: rest.name,
      photo: null,
      status: rest.status,
      email: rest.email,
      emailVerification: rest.emailVerification,
      mobileNumber: rest.mobileNumber,
      mobileNumberVerification: rest.mobileNumberVerification,
      country: rest.country,
      district: rest.district,
      facebook_link: rest.facebook_link,
    };

    const token = Lib.createToken(tokenData, config.JWT_SECRET_MEMBER, '72h');

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.LOGIN_SUCCESSFUL,
      data: rest,
      token,
    };
  }
}

export default MemberAuthService;
