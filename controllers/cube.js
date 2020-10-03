const cube = require("../models/cubeModel");


async function home(req, res) {
    //const allCubes = await cube.find(); 
    res.render("index");
}

function getOneCube(req, res) {
    // db request 

}

function createCube(req, res) {
    // db request 

    res.render("create")

}

function updateCube(req, res) {
    // db request 
    // const {

    // }

}



module.exports = {
    home,
    getOneCube,
    createCube,
    updateCube
}