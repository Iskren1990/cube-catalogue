// TODO: Require Controllers...
const {/*import all cubes func*/} = require("../controllers/cube");

module.exports = (app) => {
    // TODO...
    app.get("/", function(req, res) { res.render("index")})
    app.get("/home", function(req, res) { res.render("index")})
    app.get("/about", function(req, res) { res.render("about")})
    app.get("/create", function(req, res) { res.render("create")})
    app.post("/create/cube", function(req, res) { console.log("postCreate"); res.redirect("/")})
    app.get("/add-accessory", function(req, res) { res.render("createAccessory")})
    app.post("/create/accessory", function(req, res) { console.log("postCreateAccessory"); res.redirect("/")})
    app.get("/details/:id", function(req, res) { res.render("details")})

    app.get("/attach-accessory", function(req, res) { res.render("attachAccessory")})
    app.post("/attach-accessory", function(req, res) { console.log("postAttachAccessory"); res.redirect("/")})

    app.post("/search", function(req, res) { console.log("postSearch"); res.redirect("/")})

    app.use("*", function(req, res) { res.render("404")})
};