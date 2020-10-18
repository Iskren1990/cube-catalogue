
const errObj = {
    "/register": (data) => res.render("register-page", data),
    "Something Went Wrong": () => res.redirect("/"),
}


module.exports = function (err, req, res, next) {
    const path = req.path;
    const data = req.body;
    data.error = err.errors;

    if (err) {
        try {
            errObj[path](data);
        } catch (error) {
            res.render("404", { title: "Error", ...req.user, error: [{ msg: "Something Went Wrong" }, { msg: "Excuse Us For The Inconvenience" }] });
        }
    }
}


