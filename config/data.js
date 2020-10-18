const mongoose = require("mongoose");

module.exports = function (config) {

    mongoose.connect(
        config.dbUri,
        config.dbOptions,
        function (err) {
            if (err) { console.log("Database Error: ", err) }
            else { console.log("Successfully connected to DB") }
        }
    );
}
