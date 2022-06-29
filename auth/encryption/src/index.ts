
// import crypto from 'crypto'
// const secret = 'abcdefg'
// const hash = crypto.createHmac('sha256', secret)
//                    .update('Welcome to minjun')
//                    .digest('hex')

// console.log(hash)

// import crypto from 'crypto'

// let algorithm = 'aes-256-ctr'
// const key = Buffer.alloc(32)
// key.fill(0)
// const iv = Buffer.alloc(16)
// iv.fill(0)

// const encrypt = (text: string) => {
//   const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, key, iv)
//   let crypted: string = cipher.update(text, 'utf-8', 'base64')
//   crypted += cipher.final('base64')
//   return crypted
// }


// const decrypt = (text: string) => {
//   const cipher: crypto.Decipher = crypto.createDecipheriv(algorithm, key, iv)
//   let crypted: string = cipher.update(text, 'base64', 'utf-8')
//   crypted += cipher.final('utf-8')
//   return crypted
// }

// let encrypted = encrypt('mypassword')
// console.log(encrypted)
// let decrypted = decrypt(encrypted)
// console.log(decrypted)


import * as bcrypt from 'bcrypt'

const saltOrRounds = 10;
const myPlainTextPassword = 's$$12abc!!934'
const someOtherPlainTextPassword = 'not_bocon'

// bcrypt.genSalt(saltOrRounds,(err, salt) => {
//   bcrypt.hash(myPlainTextPassword, salt,(err, hash) => {
//     console.log(hash)
//   })
// })

const promisify = (func: Function) => (...args: any[]) => {
  return new Promise((resolve, reject) => {

    func(...args, (err: any, data: any) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const bcryptCipher = async (plainTextPassword: string, saltRounds: number): Promise<string> => {
  const bcryptHashFunction = promisify(bcrypt.hash)

  const bcryptHashValue: any = await bcryptHashFunction(plainTextPassword, saltOrRounds) 
  return bcryptHashValue
}

const compareCipher = async (plainTextPassword: string, hashedPassword: string): Promise<unknown> => {
  const bcryptCompareFunction = promisify(bcrypt.compare)

  const isSamePassword: unknown = await bcryptCompareFunction(plainTextPassword, hashedPassword)

  return isSamePassword
}

(async (): Promise<void> => {
  const hashValue = await bcryptCipher(myPlainTextPassword, saltOrRounds)
  const isSame = await compareCipher(myPlainTextPassword, hashValue)

  console.log(hashValue)
  console.log(isSame)

})()
