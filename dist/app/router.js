"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_router_1 = __importDefault(require("../common/commonRouter/check.router"));
const auth_router_1 = __importDefault(require("../auth/auth.router"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.simpleRouter = new check_router_1.default();
        this.authRouter = new auth_router_1.default();
        this.callV1Router();
    }
    callV1Router() {
        //auth router for memeber
        this.v1Router.use('/auth', this.authRouter.AuthRouter);
        this.v1Router.use('/common', this.simpleRouter.router);
    }
}
exports.default = RootRouter;
