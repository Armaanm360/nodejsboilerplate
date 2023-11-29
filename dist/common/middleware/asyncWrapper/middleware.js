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
const express_validator_1 = require("express-validator");
const customEror_1 = __importDefault(require("../../../utils/lib/customEror"));
const validationError_1 = __importDefault(require("../../../utils/lib/validationError"));
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class Wrapper extends abstract_service_1.default {
    // CONTROLLER ASYNCWRAPPER
    wrap(cb) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                // throw error if there are any invalid inputs
                console.log(errors.array());
                if (!errors.isEmpty()) {
                    throw new validationError_1.default(errors);
                }
                yield cb(req, res, next);
            }
            catch (err) {
                // console.log({ err }, 'error');
                console.error('Error details:', err.detail);
                console.error('Error line:', err.line);
                console.error('Error stack:', err.stack);
                yield this.createException(req.baseUrl, 'Error from async wrapper', err.message, err.line);
                next(new customEror_1.default(err.message, err.status, err.type));
            }
        });
    }
}
exports.default = Wrapper;
