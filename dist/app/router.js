"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_router_1 = __importDefault(require("../common/commonRouter/check.router"));
const auth_router_1 = __importDefault(require("../auth/auth.router"));
const common_router_1 = __importDefault(require("../common/commonRouter/common.router"));
const authChecker_1 = __importDefault(require("./../common/middleware/authChecker/authChecker"));
const member_router_1 = __importDefault(require("../appMember/member.router"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.simpleRouter = new check_router_1.default();
        this.authRouter = new auth_router_1.default();
        this.commonRouter = new common_router_1.default();
        this.authChecker = new authChecker_1.default();
        this.memberRouter = new member_router_1.default();
        this.callV1Router();
    }
    callV1Router() {
        //auth router for memeber
        this.v1Router.use('/auth', this.authRouter.AuthRouter);
        //testing
        this.v1Router.use('/check', this.simpleRouter.router);
        //common
        this.v1Router.use('/common', this.commonRouter.router);
        // protected member router
        this.v1Router.use('/member', this.authChecker.memberAuthChecker, this.memberRouter.MemberRouter);
    }
}
exports.default = RootRouter;
