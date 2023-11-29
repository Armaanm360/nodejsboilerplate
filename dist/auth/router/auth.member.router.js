"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const auth_member_controller_1 = __importDefault(require("../controller/auth.member.controller"));
const auth_validator_1 = __importDefault(require("./../utils/validator/auth.validator"));
class MemberAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.authValidator = new auth_validator_1.default();
        this.memberController = new auth_member_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //register router
        this.router
            .route('/register')
            .post(this.authValidator.registrationMemberValidator(), this.memberController.registration);
        //login router
        this.router
            .route('/login')
            .post(this.authValidator.loginValidator(), this.memberController.login);
    }
}
exports.default = MemberAuthRouter;
