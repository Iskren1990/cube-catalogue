
const errObj = {
    "/register": "register-page",
}




module.exports = function (err, req, res, next) {

    const path = req.path;
    const data = req.body;
    data.error = err.errors;

    if (err) {
        
        res.render(errObj[path], data);

        console.log("Custom Error ", err);
    } else {
        console.log("Global err ok");
    }
}


