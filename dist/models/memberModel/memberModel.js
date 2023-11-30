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
class MemberModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    // insert user member
    insertUserMember(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield this.db('userMember')
                .withSchema(this.MEMBER_SCHEMA)
                .insert(payload, 'id');
            return member;
        });
    }
    // check user
    checkUser({ email, mobileNumber, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield this.db('userMember')
                .withSchema(this.MEMBER_SCHEMA)
                .where((qb) => {
                if (email) {
                    qb.orWhere('email', email);
                }
                if (mobileNumber) {
                    qb.orWhere('mobileNumber', mobileNumber);
                }
            });
            return userMember;
        });
    }
    // get single user
    getSingleUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield this.db('userMember')
                .withSchema(this.MEMBER_SCHEMA)
                .where({ email: email })
                .select('*');
            return userMember;
        });
    }
    // update user member
    updateUserMember(payload, where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('userMember')
                .withSchema(this.MEMBER_SCHEMA)
                .update(payload)
                .where((qb) => {
                if (where.email) {
                    qb.where({ email: where.email });
                }
                if (where.id) {
                    qb.where({ id: where.id });
                }
            });
        });
    }
}
exports.default = MemberModel;
