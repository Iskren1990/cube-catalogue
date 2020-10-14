const jwt = require("jsonwebtoken");
const key = require("../config/config").key;

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

module.exports = {
    authCheck,
    guestCheck,
    userStatus
}