function Token(req , res ,next){
    console.log("going for the validation");
    req.token = true;
    next();
}

module.exports = Token;