const accessory = require("../models/accessoryModel");


async function createAccessory(req, res) {

    const {
        name,
        description,
        imageURL
    } = req.body;

    await accessory.create({
        name,
        description,
        imageURL
    }, function (err, suc) {
        if (err) {console.log(err) }
        else { console.log(sec) }
    });


    res.redirect("/add-accessory");
    console.log(req.body);
}

module.exports = {
    createAccessory
}