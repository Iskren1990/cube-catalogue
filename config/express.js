const { urlencoded, json } = require('express');
const express = require('express');
const handlebars = require('express-handlebars');



module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('hbs', handlebars({extname: ".hbs"}));
    app.set('view engine', '.hbs');
    
    //TODO: Setup the static files
    app.use(express.static('static'))

    app.use(urlencoded({ extended: true }))
    app.use(json());

};