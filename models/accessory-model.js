const mongoose = require("mongoose");
const { validateUrl } = require("../auxiliary/validate");
const { urlValidationError } = require("../error-messages");


const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        match: /[0-9a-zA-Z\s]+/
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500,
        match: /[0-9a-zA-Z\s]+/
    },
    imageURL: {
        type: String,
        required: true,
    },
    cubes: [{
        type: "ObjectId",
        ref: "Cube",
    }]
});

accessorySchema.path('imageURL').validate(validateUrl, urlValidationError);

module.exports = mongoose.model("Accessory", accessorySchema);