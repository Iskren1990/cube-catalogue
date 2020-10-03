const { urlencoded, json } = require('express');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express.Router();

module.exports = (app) => {

    //TODO: Setup the view engine
    app.use("view engine", handlebars)
    //TODO: Setup the static files
    app.use(express.static('static'))

    app.use(urlencoded({ extended: true }))
    app.use(json());

    
};