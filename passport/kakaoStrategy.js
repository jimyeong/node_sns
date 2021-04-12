const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

module.exports = () => {
    let localhostURI = "/auth/callback";
    passport.use(new KakaoStrategy({
        clientID: keys.KAKAO_CLIENT_ID,
        clientSecret: "",
        callbackURL: localhostURI
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            const exUser = await User.findOne({where: {snsId: profile.id, provider: "kakao"}});
            // 기존에 로그인한적 있는경우
            if (exUser) {
                done(null, exUser);
            } else {
                // 최초 로그인, 아이디 생성
                const newUser = {
                    email: profile._json && profile._json.kakao_account.email,
                    provider: profile.provider,
                    snsId: profile.id,
                    nick: profile.displayName
                }
                const result = await User.create(newUser);
                done(null, result);
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }))
}
