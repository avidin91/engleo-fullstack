"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const encodePassword = async (rawPassword) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(rawPassword, salt);
        return hash;
    }
    catch (error) {
        console.error('Error occurred during password encryption:', error);
        throw new Error('Error occurred during password encryption');
    }
};
exports.encodePassword = encodePassword;
//# sourceMappingURL=bcrypt.js.map