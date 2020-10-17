const accessory = require("../models/accessory-model");


async function createAccessory(req, res) {

    const { name, description, imageURL } = req.body;
    try {
        await accessory.create({ name, description, imageURL });

        res.redirect("/add-accessory");
    } catch (error) {
        error = [
            { msg: "Name - At least 5 characters long, who could be English letters, digits and white spaces" },
            { msg: "At least 20 characters, who could be English letters, digits and white spaces" },
            { msg: "ImageUrl - Referring to actual picture" }
        ]
        res.render("create-accessory", {...req.body, error, user: req.user});
    }

}

module.exports = {
    createAccessory
}