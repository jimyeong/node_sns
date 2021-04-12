const router = require("express").Router();
const passport = require("passport");
const {isLoggedIn, isNotLoggedIn} = require("./middlewares");
const User = require("../models/user");
const bcrypt = require("bcrypt");


// 가입
router.post("/join", isNotLoggedIn, async (req, res, next) => {
    let errors = [];
    const {email, nick, password} = req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if (exUser) {
            return res.redirect("/join?error=userExist");
        } else {
            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    console.log(hash);

                    if (err) return next(err);
                    const newuser = await User.create({
                        email: req.body.email,
                        password: hash,
                        nick: req.body.nickname,
                    });
                    req.flash("info", "the user signed up");
                    res.redirect("/");
                })
            })
        }

    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        // done(err)
        if(authError){
            console.error(authError);
            return next(authError);
        }
        // done(null, false)
        if(!user){
            req.flash("message", info.message)
            res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        })

    })(req, res, next);
});

router.get("/kakao", passport.authenticate('kakao', {
    failureRedirect: '/',
}))

router.get("/callback", passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res)=>{
    res.redirect("/dashboard");
})

router.get("/logout", isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    req.redirect("/");
})

module.exports = router;