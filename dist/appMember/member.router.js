"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_router_1 = __importDefault(require("./routers/profile.router"));
class MemberRouter {
    constructor() {
        this.MemberRouter = (0, express_1.Router)();
        this.ProfileRouter = new profile_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.MemberRouter.use('/profile', this.ProfileRouter.router);
    }
}
exports.default = MemberRouter;
