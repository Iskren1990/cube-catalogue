const mongoose = require("mongoose");

module.exports = function (config) {
    console.log(config);
    mongoose.connect(
        config.dbUri,
        config.dbOptions,
        function (err, suc) {
            if (err) { console.log("Database Error: ", err) }
            else { console.log("Successfully connected to DB") }
        }
    );
}
