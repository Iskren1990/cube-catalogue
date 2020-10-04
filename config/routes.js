// TODO: Require Controllers...
const {
    home,
    details,
    createCube,
    getAttachAccessory,
    updateCube
} = require("../controllers/cube");

const {
    createAccessory,
} = require("../controllers/accessory");

module.exports = (app) => {
    // TODO...
    app.get("/", home);
    app.get("/home", home);

    app.get("/about", function (req, res) { res.render("about", {title: "About Page"}) });

    app.get("/create", function (req, res) { res.render("create", {title: "Create Cube Page"}) });
    app.post("/create/cube", createCube);

    app.get("/add-accessory", function (req, res) { res.render("createAccessory", {title: "Create Accessory"}) });
    app.post("/create/accessory", createAccessory);

    app.get("/details/:id", details);

    app.get("/attach-accessory/:id", getAttachAccessory);
    app.post("/attach-accessory/:id", updateCube);

    app.post("/search", home);

    app.use("*", function (req, res) { res.render("404", {title: "Page Not Found"}) });
};