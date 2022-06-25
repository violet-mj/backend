const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/hello', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('hello')
})

module.exports = router

