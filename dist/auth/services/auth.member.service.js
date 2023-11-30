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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const config_1 = __importDefault(require("../../config/config"));
class MemberAuthService extends abstract_service_1.default {
    //registration service
    registrationService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
                const memberModel = this.Model.memberModel(trx);
                //check user
                const checkUser = yield memberModel.checkUser({
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
                const hashedPass = yield lib_1.default.hashPass(password);
                //creating member
                const registration = yield memberModel.insertUserMember(Object.assign({ password: hashedPass }, rest));
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
                const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_MEMBER, '24h');
                if (registration.length) {
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_OK,
                        message: this.ResMsg.HTTP_OK,
                        data: Object.assign({}, tokenData),
                        token,
                    };
                }
                else {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_BAD_REQUEST,
                        message: this.ResMsg.HTTP_BAD_REQUEST,
                    };
                }
            }));
        });
    }
    //login service
    loginService({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberModel = this.Model.memberModel();
            const checkUser = yield memberModel.getSingleUser(email);
            if (!checkUser.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            console.log(checkUser.length);
            const _a = checkUser[0], { password: hashPass } = _a, rest = __rest(_a, ["password"]);
            const checkPass = yield lib_1.default.compare(password, hashPass);
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
            const token = lib_1.default.createToken(tokenData, config_1.default.JWT_SECRET_MEMBER, '72h');
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.LOGIN_SUCCESSFUL,
                data: rest,
                token,
            };
        });
    }
    //forget password
    forgetService({ token, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenVerify = lib_1.default.verifyToken(token, config_1.default.JWT_SECRET_MEMBER);
            console.log({ tokenVerify });
            //check if token verify or not
            if (!tokenVerify) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                };
            }
            const { email: verifyEmail, type } = tokenVerify;
            if (email === verifyEmail) {
                const hashedPass = yield lib_1.default.hashPass(password);
                const memberModel = this.Model.memberModel();
                console.log(hashedPass);
                yield memberModel.updateUserMember({ password: hashedPass }, { email: email });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.PASSWORD_CHANGED,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_FORBIDDEN,
                    message: this.ResMsg.HTTP_FORBIDDEN,
                };
            }
        });
    }
}
exports.default = MemberAuthService;
