const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', (req, res) => {
    passport.authenticate('local', {
        failureRedirect: '/',
    },(err, user, info) => {

        console.log(process.env.ACCESS_SECRET, "dfasdf")
        console.log(err)
        if(err) {
            return res.status(401).send('로그인 인증 실패')
        }

        req.login(user, {session: false}, (loginError) => {
            if(loginError) {
                return res.status(401).send('loginerror')
            } else {
                const signingUser = {
                    name: user.name
                }

                const access = jwt.sign(signingUser, process.env.ACCESS_SECRET, {expiresIn: '300s'})
                const refresh = jwt.sign(signingUser, process.env.REFRESH_SECRET)
                return res.status(200).json({access, refresh})
            }

            })
    })(req, res)
})

// router.post('/token', (req, res, next) => {
//     passport.authenticate('jwt', )
// })

module.exports = router