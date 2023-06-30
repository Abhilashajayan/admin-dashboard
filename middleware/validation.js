function Validation(req,res, next) {
    if (req.token) {
        setTimeout(() => {
            console.log("token created");
            next();
        }, 2000);
        return
    }
}

module.exports = Validation;