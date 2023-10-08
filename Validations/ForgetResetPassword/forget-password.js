const { body } = require("express-validator");
const USerService = require("../../Services/user.service");

const roles = ["admin", "creator", "student", "parent"];

module.exports = [
    body("email", "Invalid email type")
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
            const response = await USerService.isEmailExist(email);
            if (!response) throw new Error(`${email} not found`);
            return true;
        }),
];
