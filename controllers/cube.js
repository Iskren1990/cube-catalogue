const cube = require("../models/cubeModel");
const accessory = require("../models/accessoryModel");


async function home(req, res) {


    const { from, to, search } = req.body;

    const searchOptions = req.path === "/search" ?
        { difficulty: { $lte: to || 6, $gte: from || 0 }, name: { $regex: search || "", $options: 'i' } } :
        {};

    const allCubes = await cube.find(searchOptions).lean();

    res.render("index", { allCubes, title: "Cubicle" });
}

async function details(req, res) {

    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();

    res.render("details", { title: "Cubicle", chosenCube });
}

async function createCube(req, res) {

    const { name, description, imageURL, difficulty } = req.body;

    await cube.create({ name, description, imageURL, difficulty });
    res.render("create");

}

async function getAttachAccessory(req, res) {

    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).lean();
    const nonAddedAccessories = await accessory.find({ "_id": { $nin: chosenCube.accessories } }).lean();

    res.render("attachAccessory", { title: "Attach Accessory", chosenCube, nonAddedAccessories });
}

async function updateCube(req, res) {

    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;

    try {

        await cube.findByIdAndUpdate(
            cubeId,
            { $addToSet: { "accessories": accessoryId } },
            function (err, suc) { console.log(err, suc); }
        );

        await accessory.findByIdAndUpdate(
            accessoryId,
            { $addToSet: { "cubes": cubeId } },
            function (err, suc) { console.log(err, suc); }
        );

    } catch (error) {
        console.log(error);
    }

    res.redirect(`/attach-accessory/${cubeId}`);
}


module.exports = {
    home,
    details,
    createCube,
    getAttachAccessory,
    updateCube
}