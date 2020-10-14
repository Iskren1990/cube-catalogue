const accessory = require("../models/accessory-model");


async function createAccessory(req, res) {

    const { name, description, imageURL } = req.body;

    await accessory.create({ name, description, imageURL }, function (err, suc) {
        if (err) {
            console.log(err);
            res.redirect("create-accessory");
        }
    });

    res.redirect("/add-accessory");
}

module.exports = {
    createAccessory
}