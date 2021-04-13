exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash("info", "you have to login");
        res.redirect("/");
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