const jwt = require("jsonwebtoken");
const key = require("../config/config").key;
const { validationResult } = require("express-validator");

function authCheck(req, res, next) {
    const token = req.cookies.uid;

    try {
        const decodedToken = jwt.verify(token, key);
        if (decodedToken == undefined) { res.redirect("/") }
        req.user = decodedToken;
        next();
    } catch (e) {
        res.redirect("/");
    }
}

function guestCheck(req, res, next) {
    const token = req.cookies.uid;

    try {
        jwt.verify(token, key);
        res.redirect("/");
    } catch (e) {
        next();
    }
}

function userStatus(req, res, next) {
    const token = req.cookies.uid;
    req.user = {};

    try {
        const decodedToken = jwt.verify(token, key);
        if (decodedToken == undefined) { res.redirect("/") }
        decodedToken.isLogged = true;
        req.user = decodedToken;
    } catch (e) {
        req.user.isLogged = false;
    }
    next();
}

function validationErrorHandler(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(errors);
        return;
    }
    next();
}

module.exports = {
    authCheck,
    guestCheck,
    userStatus,
    validationErrorHandler
}