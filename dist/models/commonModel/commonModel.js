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
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
class CommonModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    //test
    insertCustomer(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('customers')
                .withSchema(this.PUBLIC_SCHEMA)
                .insert(payload);
        });
    }
    //set otp
    // insert OTP
    insertOTP(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('emailOtp')
                .withSchema(this.DBO_SCHEMA)
                .insert(payload);
        });
    }
    // get otp
    getOTP(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.db('emailOtp')
                .withSchema(this.DBO_SCHEMA)
                .select('id', 'hashedOtp', 'tried')
                .andWhere('email', payload.email)
                .andWhere('type', payload.type)
                .andWhere('matched', 0)
                .andWhere('tried', '<', 3)
                .andWhereRaw(`"createdAt" + interval '3 minutes' > NOW()`);
            return check;
        });
    }
    //update otp
    // update otp
    updateOTP(payload, where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('emailOtp')
                .withSchema(this.DBO_SCHEMA)
                .update(payload)
                .where(where);
        });
    }
}
exports.default = CommonModel;
/*
DB Query for common OTP Last update
@Author Mahmudul islam Moon <moon.m360ict@gmail.com>
*/
