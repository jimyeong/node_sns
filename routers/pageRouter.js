const router = require("express").Router();
const {isLoggedIn, isNotLoggedIn} = require("./middlewares");


// middleware // here
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCounter = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});


router.get("/", (req, res, next) => {
    const twits = [];

    let user = req.user || null;
    if(user){
        res.redirect("/dashboard");
    }else{
        res.render("index", {
            title: "Node SNS",
            twits: twits,
            info: req.flash('info'),
            message: req.flash("message")
        })
    }
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile", {title: "my profile - Node SNS"});

})

router.get("/join", isNotLoggedIn, (req, res) => {
    res.render("pages/join", {title: "Sign up"});
});


module.exports = router;