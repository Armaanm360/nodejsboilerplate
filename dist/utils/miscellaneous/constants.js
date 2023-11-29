"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_FOR = exports.OTP_EMAIL_SUBJECT = exports.OTP_TYPE_VERIFY_MEMBER = exports.OTP_TYPE_FORGET_ADMIN = exports.OTP_TYPE_FORGET_MEMBER = exports.allStrings = exports.origin = void 0;
exports.origin = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://192.168.0.238:3000",
    "http://192.168.0.238:3001",
    "http://192.168.0.111:3000",
    "http://192.168.0.53:3000",
    "http://192.168.0.53:3001",
    "http://192.168.0.118:3000",
    "http://192.168.0.116:3000",
    "http://192.168.0.117:3000",
    "http://192.168.0.117:3001",
    "http://192.168.0.240:3000",
    "http://192.168.0.118:3000",
    "https://toab.services",
    "https://admin.toab.services",
    "https://member.toab.services",
    "https://training.toab.services",
    "https://teacher.toab.services",
    "https://fair.toab.services",
    "https://www.toab.services",
    "https://www.admin.toab.services",
    "https://www.member.toab.services",
    "https://www.training.toab.services",
    "https://www.teacher.toab.services",
    "https://www.fair.toab.services",
];
exports.allStrings = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
// OTP types constants
exports.OTP_TYPE_FORGET_MEMBER = "forget_member";
exports.OTP_TYPE_FORGET_ADMIN = "forget_admin";
exports.OTP_TYPE_VERIFY_MEMBER = "verify_member";
// Send OTP Email subject
exports.OTP_EMAIL_SUBJECT = "Your One Time Password For TOAB Verification";
// OTP for
exports.OTP_FOR = "Verification";
