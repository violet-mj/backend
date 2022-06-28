
// import crypto from 'crypto'
// const secret = 'abcdefg'
// const hash = crypto.createHmac('sha256', secret)
//                    .update('Welcome to minjun')
//                    .digest('hex')

// console.log(hash)

import crypto from 'crypto'

const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes256', key, iv)

let hash = cipher.update('hello world', 'utf-8', 'hex')
hash = hash + cipher.final('hex')
console.log(hash)

const plainText = crypto.createDecipheriv('aes256', key, iv)
console.log(plainText)