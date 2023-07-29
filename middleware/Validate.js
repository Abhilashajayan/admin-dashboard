
function validate(req, res , next){
    if(req.session.loggedIn && req.session.userval )
    {
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = validate;