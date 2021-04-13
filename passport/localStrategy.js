const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'

        }, async (email, password, done) => {
            try {
                const exUser = await User.findOne({
                    where: {email}
                })
                // 등록된 유저 있음
                if (exUser) {
                    const result = await bcrypt.compare(password, exUser.password);
                    if (result) {
                        done(null, exUser);
                    } else {
                        return done(null, false, {message: "id, password not matched"});
                    }
                } else {
                    // 등록된 유저 없음
                    done(null, false, {message: "the user doesn't exist"})
                }
            } catch
                (err) {
                return done(err);
            }
        }
    ))
}
