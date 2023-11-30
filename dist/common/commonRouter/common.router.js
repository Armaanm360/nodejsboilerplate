"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const common_controller_1 = __importDefault(require("../commonController/common.controller"));
class commonRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.commonController = new common_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // this.router.route('/check').post(this.checkController.postCheckGo);
        this.router.post('/send-email-otp', this.commonValidator.sendOtpInputValidator(), this.commonController.sendEmailOtpController);
        this.router.post('/match-email-otp', this.commonValidator.matchEmailOtpInputValidator(), this.commonController.matchEmailOtpController);
        //change password
        this.router.post('/change-password', this.commonValidator.commonChangePassInputValidation(), this.commonController.matchEmailOtpController);
    }
}
exports.default = commonRouter;
