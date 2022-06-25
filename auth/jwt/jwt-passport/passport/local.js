const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy

const user = require('../fakedb/user')

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    }, (username, password, done) => {
            const userData = user.find(u => u.name === username)

            if(!userData) {
                console.log("user not")
                return done(new Error('user is not founded'), null)
            }
            if(userData.password !== password) {
                console.log("here")
                return done(new Error('password is not valid'), null)
            }
            done(null, userData)
        }
    ))
}