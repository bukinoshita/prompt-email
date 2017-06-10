'use strict'

const username = require('username')
const npmEmail = require('npm-email')

async function getEmail() {
  try {
    const user = await username()
    const email = await npmEmail(user)
    return email
  } catch (err) {
    return err
  }
}

module.exports = getEmail
