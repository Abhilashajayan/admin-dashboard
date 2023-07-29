function advalidate(req, res , next){
    if(req.session.loggIn)
    {
        next();
    }else{
        res.redirect('/admin');
    }
}

module.exports = advalidate;