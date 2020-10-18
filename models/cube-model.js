const mongoose = require("mongoose");
const { validateUrl } = require("../auxiliary/validate");
const { urlValidationError } = require("../error-messages");

const cubeSchema = new mongoose.Schema({
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
    difficulty: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    creatorId: {
        type: "ObjectID",
        required: true,
        ref: "User"
    },
    accessories: [{
        type: "ObjectID",
        ref: "Accessory"
    }]
});

cubeSchema.path('imageURL').validate(validateUrl, urlValidationError);

module.exports = mongoose.model("Cube", cubeSchema);