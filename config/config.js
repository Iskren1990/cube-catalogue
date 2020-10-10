module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbUri: "mongodb+srv://test:test@cluster0.4dqi4.mongodb.net/cube-catalog?retryWrites=true&w=majority",
        dbOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    },
    production: { }
};