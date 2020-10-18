const cube = require("../models/cube-model");
const accessory = require("../models/accessory-model");
const jwt = require("jsonwebtoken");
const key = require("../config/config").key;
const commonError = require("../error-messages").schemaValidationError;


async function home(req, res) {

    const { from, to, search } = req.body;

    const searchOptions = req.path === "/search" ?
        { difficulty: { $lte: to || 6, $gte: from || 0 }, name: { $regex: search || "", $options: 'i' } } :
        {};

    const allCubes = await cube.find(searchOptions).lean();

    res.render("index", { allCubes, title: "Cubicle", user: req.user });
}

async function details(req, res) {
    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();
    const isOwner = chosenCube.creatorId == req.user.id;

    res.render("details", { title: "Cubicle", chosenCube, user: req.user, isOwner });
}

async function createCube(req, res) {
    const creatorId = req.user.id
    const { name, description, imageURL, difficulty } = req.body;

    await cube.create({ name, description, imageURL, difficulty, creatorId },
        function (error) {
            if (error) {
                error = commonError;
                res.render("create", { user: req.user, error, ...req.body })
            } else {
                res.render("create", { user: req.user });
            }
        });
}

async function getAttachAccessory(req, res) {
    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).lean();
    const nonAddedAccessories = await accessory.find({ "_id": { $nin: chosenCube.accessories } }).lean();

    res.render("attach-accessory", { title: "Attach Accessory", chosenCube, nonAddedAccessories, user: req.user });
}

async function updateCube(req, res, next) {

    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;

    await cube.findOneAndUpdate(
        { _id: cubeId },
        { $addToSet: { "accessories": accessoryId } },
        async function (err, suc) {
            if (err) {
                new Error("Something Went Wrong");
                next(err);
            } else {
                await accessory.findByIdAndUpdate(
                    accessoryId,
                    { $addToSet: { "cubes": cubeId } },
                    function (err, suc) {
                        if (err) {
                            new Error("Something Went Wrong");
                            next(err);
                        }
                    }
                );
            }
        }
    );

    res.redirect(`/attach-accessory/${cubeId}`);
}

async function editCubePage(req, res) {
    const userId = req.user.id;
    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId).populate("accessories").lean();

    if (chosenCube.creatorId != userId) {
        res.redirect("/");
        return;
    }

    res.render("edit-cube-page", { title: "Cubicle", ...chosenCube, user: req.user });
}

async function editCubePost(req, res) {
    const cubeId = req.params.id;
    const { name, description, imageURL, difficulty } = req.body;

    await cube.findOneAndUpdate(
        { _id: cubeId, creatorId: req.user.id },
        { name, description, imageURL, difficulty },
        { runValidators: true },
        function errorHandler(error, suc) {
            error = commonError;
            res.render(`edit-cube-page`, {
                user: req.user,
                error,
                _id: req.params.id,
                ...req.body
            });
        }
    );

    res.redirect(`/details/${cubeId}`);
}

async function deleteCubePage(req, res) {
    const cubeId = req.params.id;
    const chosenCube = await cube.findById(cubeId)
        .populate("accessories")
        .lean();

    if (chosenCube.creatorId != userId) {
        res.redirect("/");
        return;
    }

    res.render("delete-cube-page", { title: "Cubicle", ...chosenCube, user: req.user })
}

async function deleteCubePost(req, res) {
    const cubeId = req.params.id;

    cube.deleteOne({ _id: cubeId, creatorId: req.user.id },
        function (err) {
            if (err) {
                res.redirect(`/delete/${cubeId}`);
            } else {
                res.redirect("/");
            }
        });
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