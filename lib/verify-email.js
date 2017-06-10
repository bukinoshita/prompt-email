'use stric'

const chalk = require('chalk')
const nicht = require('nicht')
const getEmail = require('./get-email')

async function verifyEmail({ verify = true } = {}) {
  try {
    if (verify) {
      const email = await getEmail()
      const verification = await nicht(`Is your email ${chalk.green(email)}?`)

      if (verification) {
        return email
      }
    }

    return false
  } catch (err) {
    return err
  }
}

module.exports = verifyEmail
