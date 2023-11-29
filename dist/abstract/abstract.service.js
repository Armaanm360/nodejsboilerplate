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
const database_1 = require("../app/database");
const rootModels_1 = __importDefault(require("../models/rootModels"));
const manageFile_1 = __importDefault(require("../utils/lib/manageFile"));
const responseMessage_1 = __importDefault(require("../utils/miscellaneous/responseMessage"));
const schema_1 = __importDefault(require("../utils/miscellaneous/schema"));
const statusCode_1 = __importDefault(require("../utils/miscellaneous/statusCode"));
class AbstractServices {
    constructor() {
        this.db = database_1.db;
        this.manageFile = new manageFile_1.default();
        this.ResMsg = responseMessage_1.default;
        this.StatusCode = statusCode_1.default;
        this.Model = new rootModels_1.default(this.db);
        this.pool = database_1.pool;
        this.schema = new schema_1.default();
    }
    // insert exception error
    createException(endPoint = null, exceptionText = null, errorMsg = null, lineNumber = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query(`call dbo."insertExceptionError"($1,$2,$3,$4)`, [
                    endPoint,
                    exceptionText,
                    errorMsg,
                    lineNumber,
                ]);
                client.release();
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                // if (client) {
                //   client.release();
                // }
            }
        });
    }
}
exports.default = AbstractServices;
