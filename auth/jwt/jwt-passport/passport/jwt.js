const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const user = require('../fakedb/user')

module.exports = () => {
   passport.use(new JwtStrategy({
       secretOrKey: process.env.ACCESS_SECRET,
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
   }, (jwt_payload, done) => {
       const userData = user.find(u =>  u.name === jwt_payload.name)

       if(!userData) {
           return done(new Error('user is not founded'))
       }

       done(null, user)

   }))
}