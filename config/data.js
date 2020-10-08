const mongoose = require("mongoose");

module.exports = function (config) {
    console.log(config);
    mongoose.connect(
        config.dbUri || "mongodb+srv://test:test@cluster0.4dqi4.mongodb.net/cube-catalog?retryWrites=true&w=majority",
        config.dbOptions,
        function (err, suc) {
            if (err) { console.log("Database Error: ", err) }
            else { console.log("Successfully connected to DB") }
        }
    );
}
