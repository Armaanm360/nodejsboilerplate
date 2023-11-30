"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class MemberValidator {
    // change password validator
    changePassword() {
        return [
            (0, express_validator_1.body)('old_password', 'Provide valid old password.')
                .isString()
                .isLength({ min: 8 }),
            (0, express_validator_1.body)('new_password', 'Provide valid new password.')
                .isString()
                .isLength({ min: 8 }),
        ];
    }
}
exports.default = MemberValidator;
