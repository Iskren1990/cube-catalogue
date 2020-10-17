const cube = require("../models/cube-model");
const accessory = require("../models/accessory-model");
const jwt = require("jsonwebtoken");
const key = require("../config/config").key;


console.log("Refactor unnecessary code in cube.js");


async function home(req, res) {

    const { from, to, search } = req.body;

    const searchOptions = req.path === "/search" ?
        { difficulty: { $lte: to || 6, $gte: from || 0 }, name: { $regex: search || "", $options: 'i' } } :
        {};

    const allCubes = await cube.find(searchOptions).lean();

    res.render("index", { allCubes, title: "Cubicle", user: req.user });
}

async function details(req, res) {
    console.log("VALIDATE USER IS OWNER OF THE CUBE IN CUBE.JS");
    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();
    // const isOwner = chosenCube.id === 
    res.render("details", { title: "Cubicle", chosenCube, user: req.user });
}

async function createCube(req, res) {
    const creatorId = req.user.id

    const { name, description, imageURL, difficulty } = req.body;
    try {
        await cube.create({ name, description, imageURL, difficulty, creatorId });
        res.render("create", { user: req.user });
    } catch (error) {
        error = [
            { msg: "Name - At least 5 characters long, who could be English letters, digits and white spaces" },
            { msg: "At least 20 characters, who could be English letters, digits and white spaces" },
            { msg: "ImageUrl - Referring to actual picture" }
        ]
        res.render("create", { user: req.user, error })
    }


}

async function getAttachAccessory(req, res) {

    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).lean();
    const nonAddedAccessories = await accessory.find({ "_id": { $nin: chosenCube.accessories } }).lean();

    res.render("attach-accessory", { title: "Attach Accessory", chosenCube, nonAddedAccessories, user: req.user });
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

async function editCubePage(req, res) {

    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();

    res.render("edit-cube-page", { title: "Cubicle", ...chosenCube, user: req.user });

}

async function editCubePost(req, res) {

    const cubeId = req.params.id;
    const { name, description, imageURL, difficulty } = req.body;
    try {
        await cube.findByIdAndUpdate(
            cubeId,
            { name, description, imageURL, difficulty },
            { runValidators: true },
            function (err, suc) { console.log(err); }
        );

        res.redirect(`/details/${cubeId}`);
    } catch (error) {
        error = [
            { msg: "Name - At least 5 characters long, who could be English letters, digits and white spaces" },
            { msg: "At least 20 characters, who could be English letters, digits and white spaces" },
            { msg: "ImageUrl - Referring to actual picture" }
        ]
        res.render(`edit-cube-page`, { user: req.user, error, ...req.body })
    }

}

async function deleteCubePage(req, res) {

    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();

    res.render("delete-cube-page", { title: "Cubicle", ...chosenCube, user: req.user })
}

async function deleteCubePost(req, res) {

    const cubeId = req.params.id;

    cube.deleteOne({ _id: cubeId }, function (err) { if (err) { res.redirect(`/delete/${cubeId}`) } });

    res.redirect("/");

}

module.exports = {
    home,
    details,
    createCube,
    editCubePage,
    editCubePost,
    getAttachAccessory,
    updateCube,
    deleteCubePage,
    deleteCubePost
}