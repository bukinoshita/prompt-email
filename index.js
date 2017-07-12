'use strict'

const emailPrompt = require('./lib/email-prompt')
const verifyEmail = require('./lib/verify-email')

module.exports = ({ verify = true } = {}) => {
  return new Promise((resolve, reject) => {
    verifyEmail({ verify })
      .then(email => {
        if (email) {
          resolve(email)
          return
        }

        process.stdout.write('\n')

        emailPrompt().then(email => resolve(email)).catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}
