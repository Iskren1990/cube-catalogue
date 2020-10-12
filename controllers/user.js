const user = require("../models/user-model");

const {
    validatePasswords,
} = require("../auxiliary/validate");

function loginPage(req, res) {
    res.render("login-page");
}

async function loginUser(req, res) {
    const {
        username,
        password
    } = req.body;

    const dbResponse = await user.findOne({ username });
    
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

    const dbRes = await user.create({ username, password });
    console.log(dbRes);
    res.redirect("/");
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