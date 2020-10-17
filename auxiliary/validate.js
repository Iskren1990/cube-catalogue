const { body } = require("express-validator");

const validatePasswordsMatch = body("repeatPassword").custom((rePass, { req }) => {

    if (req.body.password !== rePass) {
        throw new Error("Passwords does not match");
    }
    return true;
});


const validatePassword = body("password").isLength({ min: 5 }).custom(password => {
    if (!/[0-9a-zA-Z]+/.test(password)) {
        throw new Error("Password must include numbers and latin characters only");
    }
    return true;
});


module.exports = {
    validatePasswordsMatch,
    validatePassword,
};