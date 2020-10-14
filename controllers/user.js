const user = require("../models/user-model");
const validatePasswords = require("../auxiliary/validate");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const key = require("../config/config").key;


function loginPage(req, res) {

    res.render("login-page", { user: req.user });

}

async function loginUser(req, res) {
    const {
        username,
        password
    } = req.body;

    const dbResponse = await user.findOne({ username });

    const isRegistered = await bcrypt.compare(password, dbResponse.password);

    if (isRegistered == false) {
        res.redirect("/login");
        return;
    }

    const token = genToken({ id: dbResponse.id, username, isLogged: true });

    res.cookie("uid", token).redirect("/");
}


function registerPage(req, res) {
    res.render("register-page", { user: req.user });
}

async function registerUser(req, res) {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (validatePasswords(password, repeatPassword) === false) {
        res.redirect("/register");
        return;
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = bcrypt.hashSync(password, salt);

    const { id } = await user.create({ username, password: hashedPwd });

    const token = genToken({ id, username, isLogged: true });

    res.cookie("uid", token).redirect("/");
}

function logoutUser(req, res) {

    res.clearCookie("uid");
    res.redirect("/");

}

module.exports = {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser
}




function genToken(credentials) {
    return jwt.sign(credentials, key);
}