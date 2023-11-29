"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commonValidator_1 = __importDefault(require("../common/validators/commonValidator"));
class AbstractRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.commonValidator = new commonValidator_1.default();
        // protected uploader = new Uploader();
        // protected fileFolders = FileFolder;
    }
}
exports.default = AbstractRouter;
