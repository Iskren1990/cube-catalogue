function validatePasswords(pass, rePass) {
    return pass === rePass ? true : false;
}



module.exports = {
    validatePasswords,
}