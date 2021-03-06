const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();
const globalErrorHandler = require("./auxiliary/global-error-handler");

require("./config/data")(config);
require('./config/express')(app);
require('./routes/routes')(app);

app.use(globalErrorHandler);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));