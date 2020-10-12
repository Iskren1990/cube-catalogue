// TODO: Require Controllers...
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


module.exports = (app) => {
    // TODO...
    app.get("/", home);
    app.get("/home", home);

    app.get("/about", function (req, res) { res.render("about", { title: "About Page" }) });

    app.get("/create", function (req, res) { res.render("create", { title: "Create Cube Page" }) });
    app.post("/create/cube", createCube);

    app.get("/add-accessory", function (req, res) { res.render("create-accessory", { title: "Create Accessory" }) });
    app.post("/create/accessory", createAccessory);

    app.get("/details/:id", details);

    app.get("/attach-accessory/:id", getAttachAccessory);
    app.post("/attach-accessory/:id", updateCube);

    app.get("/login", loginPage);
    app.post("/login", loginUser);

    app.get("/logout", logoutUser);


    app.get("/register", registerPage);
    app.post("/register", registerUser);

    app.get("/edit/:id", editCubePage);
    app.post("/edit/:id", editCubePost);

    app.get("/delete/:id", deleteCubePage);
    app.post("/delete/:id", deleteCubePost);

    app.post("/search", home);

    app.use("*", function (req, res) { res.render("404", { title: "Page Not Found" }) });
};