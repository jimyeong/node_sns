exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated){
        next();
    }else{
        res.status(403)
            .send("login is needed");
    }
}
exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent("now you are loginned");
        req.flash('message', "you are loggined");
        res.redirect(`/?error=${message}`);
    }
}