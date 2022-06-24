const jwt = require('jsonwebtoken')
const posts = [
    {
        id: 1,
        name: 'John',
        password: '1234'
    },
    {
        id: 2,
        name: 'Mike',
        password: '2345'
    },
]

const verifyUser = (username, password) => {
    const userData = posts.find(user => user.name === username)
    console.log(userData)
    if(userData && userData.password === password) return true

    return false
}

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

module.exports = {
    posts,
    verifyUser,
    authenticateUser
}