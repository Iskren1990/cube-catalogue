const {
    home,
    details,
    createCube,
    getAttachAccessory,
    updateCube,
    editCubePage,
    editCubePost,
    deleteCubePage,
    deleteCubePost
} = require("../controllers/cube");

const {
    createAccessory,
} = require("../controllers/accessory");

const {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser
} = require("../controllers/user");

const {
    authCheck,
    guestCheck,
    userStatus,
    validationErrorHandler
} = require("../middlewares/middleware");

const {
    validatePasswordsMatch,
    validatePassword,
} = require("../auxiliary/validate");

module.exports = (app) => {

    app.get("/", userStatus, home);
    app.get("/home", userStatus, home);

    app.get("/about", userStatus, function (req, res) {
        res.render("about", { title: "About Page", ...req.user })
    });

    app.get("/create", authCheck, userStatus, function (req, res) {
        res.render("create", { title: "Create Cube Page", ...req.user })
    });
    app.post("/create/cube", authCheck, userStatus, createCube);

    app.get("/add-accessory", authCheck, userStatus, function (req, res) {
        res.render("create-accessory", { title: "Create Accessory", ...req.user })
    });
    app.post("/create/accessory", authCheck, userStatus, createAccessory);

    app.get("/details/:id", userStatus, details);

    app.get("/attach-accessory/:id", authCheck, userStatus, getAttachAccessory);
    app.post("/attach-accessory/:id", authCheck, userStatus, updateCube);

    app.get("/login", guestCheck, userStatus, loginPage);
    app.post("/login", guestCheck, userStatus, loginUser);

    app.get("/logout", userStatus, logoutUser);


    app.get("/register", guestCheck, userStatus, registerPage);
    app.post("/register",
        guestCheck,
        userStatus,
        validatePasswordsMatch,
        validatePassword,
        validationErrorHandler,
        registerUser);

    app.get("/edit/:id", authCheck, userStatus, editCubePage);
    app.post("/edit/:id", authCheck, userStatus, editCubePost);

    app.get("/delete/:id", authCheck, userStatus, deleteCubePage);
    app.post("/delete/:id", authCheck, userStatus, deleteCubePost);

    app.post("/search", userStatus, home);

    app.use("*", userStatus, function (req, res) {
        res.render("404", { title: "Page Not Found", ...req.user })
    });
};