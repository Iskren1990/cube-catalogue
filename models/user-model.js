const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Minimum number of username characters is 5"],
        match: [/[A-Za-z0-9]+/, "Username should have only latin characters and numbers"],
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model("User", userSchema);