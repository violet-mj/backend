const express = require('express')
const jwt = require('jsonwebtoken')
const {verifyUser, posts} = require('./utils')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const authenticateUser = (req, res, next) => {

    const authorizationHeader = req.headers['authorization']
    const token  = authorizationHeader?.split(' ')[1]

    if(!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        console.log(user)
        if(err) return res.sendStatus(403)
        next()
    })
}

app.post('/token', (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    const refreshToken = authorizationHeader.split(' ')[1]
    console.log(refreshToken)

    if(!refreshToken) return res.status(401).send('refreshToken not found')

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).send('refreshToken is not valid')

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).send({token})
    })

})

app.get('/posts', authenticateUser, (req, res) => {
    return res.status(200).json(posts)
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    const user = {name: username}

    const isVerify = verifyUser(username, password)

    if(isVerify) {
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m'})
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2h'})
        return res.json({token, refreshToken})
    }
    return res.sendStatus(403)
})


app.listen(3000, () => {
    console.log('server is opened at 3000')
})