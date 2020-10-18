const accessory = require("../models/accessory-model");
const error = require("../error-messages").schemaValidationError;

async function createAccessory(req, res) {

    const { name, description, imageURL } = req.body;
    try {
        await accessory.create({ name, description, imageURL });

        res.redirect("/add-accessory");
    } catch (err) {
        res.render("create-accessory", { ...req.body, error, user: req.user });
    }

}

module.exports = {
    createAccessory
}