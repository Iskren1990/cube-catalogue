// TODO: Require Controllers...
const {/*import all cubes func*/} = require("../controllers/cube");

module.exports = (app) => {
    // TODO...
    app.get("/", function(req, res) { res.render("index")})
    app.get("/about", function(req, res) { res.render("about")})
    app.get("/create", function(req, res) { res.render("create")})
    app.get("/add-accessory", function(req, res) { res.render("createAccessory")})
    app.get("/details/:id", function(req, res) { res.render("details")})

    app.use("*", function(req, res) { res.render("404")})
};