// TODO: Require Controllers...
const {
    home,
    getOneCube,
    createCube,
    updateCube
} = require("../controllers/cube");

const {
    createAccessory,
} = require("../controllers/accessory");

module.exports = (app) => {
    // TODO...
    app.get("/", home);
    app.get("/home", home);
    app.get("/about", function (req, res) { res.render("about") });
    app.get("/create", createCube);
    app.post("/create/cube", function (req, res) { console.log("postCreate"); res.redirect("/") });
    app.get("/add-accessory", function (req, res) { res.render("createAccessory") });
    app.post("/create/accessory", createAccessory);
    app.get("/details/:id", function (req, res) { res.render("details") });

    app.get("/attach-accessory", function (req, res) { res.render("attachAccessory") });
    app.post("/attach-accessory", function (req, res) { console.log("postAttachAccessory"); res.redirect("/") });

    app.post("/search", function (req, res) { console.log("postSearch"); res.redirect("/") });

    app.use("*", function (req, res) { res.render("404") });
};