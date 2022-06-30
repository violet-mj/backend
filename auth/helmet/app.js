
const helmet = require('helmet')
const express = require('express')

const app = express()

// app.use(helmet())
app.use(helmet.referrerPolicy({
    policy: 'same-origin'
}))


app.use((req, res, next) => {
    console.log(req.headers)
    next()
})

app.use(helmet.noSniff())

app.get('/', (req, res) => {
    res.json({
        hello: "hello"
    })
})

app.listen(3000, () => {
    console.log('server is opened at 3000')
})