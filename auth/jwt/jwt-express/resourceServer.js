const express = require('express')

const {authenticateUser} = require('./utils')

const app = express()
require('dotenv').config()

app.get('/private', authenticateUser, (req, res, next) => {
    res.send('private information')
})

app.listen(4000, () => {
    console.log('server is opened at 4000')
})