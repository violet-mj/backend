const express = require('express')
const passport = require('passport')

const app = express()
require('dotenv').config()
const init = require('./passport/init')


const authRouter = require('./routes/auth')
const postRouter = require('./routes/posts')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
init()
app.use('/auth', authRouter)
app.use('/post', postRouter)

app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(3000, () => {
    console.log('server is opened at 3000')
})
