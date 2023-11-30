import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { IGetOTPPayload } from '../../utils/interfaces/common/commonInterface';
import {
  OTP_EMAIL_SUBJECT,
  OTP_FOR,
  OTP_TYPE_FORGET_ADMIN,
  OTP_TYPE_FORGET_MEMBER,
  OTP_TYPE_VERIFY_MEMBER,
} from '../../utils/miscellaneous/constants';
import Lib from '../../utils/lib/lib';
import { sendEmailOtpTemplate } from '../../utils/templates/sendEmailOtp';
import ResMsg from '../../utils/miscellaneous/responseMessage';
import config from '../../config/config';

class commonService extends AbstractServices {
  constructor() {
    super();
  }
  //send email otp service
  public async sendOtpToEmailService(req: Request) {
    return await this.db.transaction(async (trx) => {
      const { email, type } = req.body as IGetOTPPayload;
      const memberModel = this.Model.memberModel(trx);

      switch (type) {
        case OTP_TYPE_VERIFY_MEMBER || OTP_TYPE_FORGET_MEMBER:
          const checkMember = await memberModel.getSingleUser(email);
          if (!checkMember.length) {
            return {
              success: false,
              code: this.StatusCode.HTTP_NOT_FOUND,
              message: this.ResMsg.NOT_FOUND_USER_WITH_EMAIL,
            };
          }
          break;

        default:
          break;
      }

      const commonModel = this.Model.commonModel(trx);
      const checkOtp = await commonModel.getOTP({ email: email, type: type });

      if (checkOtp.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_GONE,
          message: this.ResMsg.THREE_TIMES_EXPIRED,
        };
      }

      const otp = Lib.otpGenNumber(6);
      const hashed_otp = await Lib.hashPass(otp);

      const send = await Lib.sendEmail(
        email,
        OTP_EMAIL_SUBJECT,
        sendEmailOtpTemplate(otp, OTP_FOR)
      );

      if (send) {
        await commonModel.insertOTP({
          hashedOtp: hashed_otp,
          email: email,
          type: type,
        });

        return {
          success: true,
          code: this.StatusCode.HTTP_OK,
          message: this.ResMsg.OTP_SENT,
          data: {
            email,
          },
        };
      } else {
        return {
          success: false,
          code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
          message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
        };
      }
    });
  }

  //match email otp service
  public async matchEmailOtpService(req: Request) {
    return this.db.transaction(async (trx) => {
      const { email, otp, type } = req.body;
      const commonModel = this.Model.commonModel(trx);
      const checkOtp = await commonModel.getOTP({
        email,
        type,
      });

      if (!checkOtp.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_FORBIDDEN,
          message: ResMsg.OTP_EXPIRED,
        };
      }

      const { id: email_otp_id, hashedOtp, tried } = checkOtp[0];

      if (tried > 3) {
        return {
          success: false,
          code: this.StatusCode.HTTP_GONE,
          message: this.ResMsg.TOO_MUCH_ATTEMPT,
        };
      }

      const otpValidation = await Lib.compare(otp.toString(), hashedOtp);

      if (otpValidation) {
        await commonModel.updateOTP(
          {
            tried: tried + 1,
            matched: 1,
          },
          { id: email_otp_id }
        );

        let secret = config.JWT_SECRET_MEMBER;
        switch (type) {
          case OTP_TYPE_FORGET_ADMIN:
            secret = config.JWT_SECRET_ADMIN;
            break;
          case OTP_TYPE_FORGET_ADMIN:
            secret = config.JWT_SECRET_MEMBER;
            break;
          default:
            break;
        }

        if (type === OTP_TYPE_VERIFY_MEMBER) {
          const memberModel = this.Model.memberModel(trx);
          await memberModel.updateUserMember(
            { emailVerification: true },
            { email: email }
          );
        }

        const token = Lib.createToken(
          {
            email: email,
            type: type,
          },
          secret,
          '5m'
        );

        return {
          success: true,
          code: this.StatusCode.HTTP_ACCEPTED,
          message: this.ResMsg.OTP_MATCHED,
          token,
        };
      } else {
        await commonModel.updateOTP(
          {
            tried: tried + 1,
          },
          { id: email_otp_id }
        );

        return {
          success: false,
          code: this.StatusCode.HTTP_UNAUTHORIZED,
          message: this.ResMsg.OTP_INVALID,
        };
      }
    });
  }
}
export default commonService;
