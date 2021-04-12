const KakaoStrategy = require("passport-kakao").Strategy;
const keys = require("../config/keys");
const User = require("../models/user");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const passport = require("passport");



module.exports = ()=>{
    // login
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    // request
    passport.deserializeUser(function (id, done){
        User.findOne({where: {id}})
            .then(user=>done(null, user))
            .catch(err=>done(err));
    });

    local();
    kakao();
}