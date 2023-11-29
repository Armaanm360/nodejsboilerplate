"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonModel_1 = __importDefault(require("./commonModel/commonModel"));
const memberModel_1 = __importDefault(require("./memberModel/memberModel"));
class Models {
    constructor(db) {
        this.db = db;
    }
    // common models
    commonModel(trx) {
        return new commonModel_1.default(trx || this.db);
    }
    // member registration models
    memberModel(trx) {
        return new memberModel_1.default(trx || this.db);
    }
}
exports.default = Models;
