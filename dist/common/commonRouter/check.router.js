"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const checkController_1 = __importDefault(require("./../commonController/checkController"));
class checkRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.checkController = new checkController_1.default();
        this.callRouter();
    }
    callRouter() {
        // this.router.route('/check').post(this.checkController.postCheckGo);
        this.router.route('/check').post(this.checkController.postcheckGo);
    }
}
exports.default = checkRouter;
