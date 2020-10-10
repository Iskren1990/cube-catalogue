function loginPage(req, res) {
    res.render("loginPage");
}


function registerPage(req, res) {
    res.render("registerPage");
}


function logoutUser(req, res) {
    res.redirect("/");
}

module.exports = {
    loginPage,
    registerPage,
    logoutUser
}