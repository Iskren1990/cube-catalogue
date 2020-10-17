const mongoose = require("mongoose");

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

accessorySchema.path('imageURL').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
  }, 'Image url is not valid');

module.exports = mongoose.model("Accessory", accessorySchema);