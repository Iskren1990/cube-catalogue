const user = require("../models/user-model");
const validatePasswords = require("../auxiliary/validate");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const key = require("../config/config").key;


function loginPage(req, res) {
    console.log(res.cookie);
    res.render("login-page");
}

async function loginUser(req, res) {
    const {
        username,
        password
    } = req.body;

    const dbResponse = await user.findOne({ username });

    const isRegistered = bcrypt.compare(password, dbResponse.password);
    
    console.log(dbResponse);
    res.redirect("/login");

}


function registerPage(req, res) {
    res.render("register-page");
}

async function registerUser(req, res) {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (validatePasswords(password, repeatPassword) === false) { res.redirect("/login") };

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = bcrypt.hashSync(password, salt);

    const { id }  = await user.create({ username, password: hashedPwd });
    
    const token = jwt.sign({ id, username }, key)

    res.cookie("uid", token).redirect("/");
}

function logoutUser(req, res) {
    console.log("Unlog user");
    res.redirect("/");
}

module.exports = {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser
}