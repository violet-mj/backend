
// import crypto from 'crypto'
// const secret = 'abcdefg'
// const hash = crypto.createHmac('sha256', secret)
//                    .update('Welcome to minjun')
//                    .digest('hex')

// console.log(hash)

import crypto from 'crypto'

let algorithm = 'aes-256-ctr'
const key = Buffer.alloc(32)
key.fill(0)
const iv = Buffer.alloc(16)
iv.fill(0)

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let crypted = cipher.update(text, 'utf-8', 'base64')
  crypted += cipher.final('base64')
  return crypted
}


const decrypt = (text: string) => {
  const cipher = crypto.createDecipheriv(algorithm, key, iv)
  let crypted = cipher.update(text, 'base64', 'utf-8')
  crypted += cipher.final('utf-8')
  return crypted
}

let encrypted = encrypt('mypassword')
console.log(encrypted)
let decrypted = decrypt(encrypted)
console.log(decrypted)