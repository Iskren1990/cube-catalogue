const user = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const key = require("../config/config").key;


function loginPage(req, res) {
    res.render("login-page", { title: "Login Page", ...req.user });
}

async function loginUser(req, res) {
    const {
        username,
        password
    } = req.body;

    try {
        const dbResponse = await user.findOne({ username });
        await bcrypt.compare(password, dbResponse.password);
        const token = genToken({ id: dbResponse.id, username, isLogged: true });

        res.cookie("uid", token).redirect("/");

    } catch (error) {
        res.render("login-page", {
            title: "Login Page",
            error: [{ msg: "Wrong Username or password" }],
            ...req.user
        });
    }
}


function registerPage(req, res) {
    res.render("register-page", { title: "Register Page" });
}

async function registerUser(req, res) {
    const {
        username,
        password,
    } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = bcrypt.hashSync(password, salt);
        const { id } = await user.create({ username, password: hashedPwd });
        const token = genToken({ id, username, isLogged: true });

        res.cookie("uid", token).redirect("/");

    } catch (err) {
        const error = [];
        if (!err.code) {
            Object.entries(err.errors).forEach(message => error.push({msg: message[1]}));
        } else {
            error.push({ msg: "The username is already taken" });
        }
        
        res.render("register-page", {
            title: "Register Page",
            username,
            error,
            ...req.user
        });

    }

}

function logoutUser(req, res) {
    res.clearCookie("uid");
    res.redirect("/");
}

function genToken(credentials) {
    return jwt.sign(credentials, key);
}


module.exports = {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser
}