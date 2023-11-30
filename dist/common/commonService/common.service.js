"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const constants_1 = require("../../utils/miscellaneous/constants");
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const sendEmailOtp_1 = require("../../utils/templates/sendEmailOtp");
const responseMessage_1 = __importDefault(require("../../utils/miscellaneous/responseMessage"));
const config_1 = __importDefault(require("../../config/config"));
class commonService extends abstract_service_1.default {
    constructor() {
        super();
    }
    //send email otp service
    sendOtpToEmailService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { email, type } = req.body;
                const memberModel = this.Model.memberModel(trx);
                switch (type) {
                    case constants_1.OTP_TYPE_VERIFY_MEMBER || constants_1.OTP_TYPE_FORGET_MEMBER:
                        const checkMember = yield memberModel.getSingleUser(email);
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
                const checkOtp = yield commonModel.getOTP({ email: email, type: type });
                if (checkOtp.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_GONE,
                        message: this.ResMsg.THREE_TIMES_EXPIRED,
                    };
                }
                const otp = lib_1.default.otpGenNumber(6);
                const hashed_otp = yield lib_1.default.hashPass(otp);
                const send = yield lib_1.default.sendEmail(email, constants_1.OTP_EMAIL_SUBJECT, (0, sendEmailOtp_1.sendEmailOtpTemplate)(otp, constants_1.OTP_FOR));
                if (send) {
                    yield commonModel.insertOTP({
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
                }
                else {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                        message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
                    };
                }
            }));
        });
    }
    //match email otp service
    matchEmailOtpService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { email, otp, type } = req.body;
                const commonModel = this.Model.commonModel(trx);
                const checkOtp = yield commonModel.getOTP({
                    email,
                    type,
                });
                if (!checkOtp.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_FORBIDDEN,
                        message: responseMessage_1.default.OTP_EXPIRED,
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
                const otpValidation = yield lib_1.default.compare(otp.toString(), hashedOtp);
                if (otpValidation) {
                    yield commonModel.updateOTP({
                        tried: tried + 1,
                        matched: 1,
                    }, { id: email_otp_id });
                    let secret = config_1.default.JWT_SECRET_MEMBER;
                    switch (type) {
                        case constants_1.OTP_TYPE_FORGET_ADMIN:
                            secret = config_1.default.JWT_SECRET_ADMIN;
                            break;
                        case constants_1.OTP_TYPE_FORGET_ADMIN:
                            secret = config_1.default.JWT_SECRET_MEMBER;
                            break;
                        default:
                            break;
                    }
                    if (type === constants_1.OTP_TYPE_VERIFY_MEMBER) {
                        const memberModel = this.Model.memberModel(trx);
                        yield memberModel.updateUserMember({ emailVerification: true }, { email: email });
                    }
                    const token = lib_1.default.createToken({
                        email: email,
                        type: type,
                    }, secret, '5m');
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_ACCEPTED,
                        message: this.ResMsg.OTP_MATCHED,
                        token,
                    };
                }
                else {
                    yield commonModel.updateOTP({
                        tried: tried + 1,
                    }, { id: email_otp_id });
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_UNAUTHORIZED,
                        message: this.ResMsg.OTP_INVALID,
                    };
                }
            }));
        });
    }
}
exports.default = commonService;
