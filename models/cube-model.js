const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
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
        type: String,
        required: true
    },
    accessories: [{
        type: "ObjectId",
        ref: "Accessory"
    }]
});

cubeSchema.path('imageURL').validate(function(url) {
    return url.startsWith('http://') || url.startsWith('https://')
  }, 'Image url is not valid');

module.exports = mongoose.model("Cube", cubeSchema);