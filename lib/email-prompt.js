const ansi = require('ansi-escapes')
const chalk = require('chalk')

module.exports = (
  {
    start = '> Enter your email: ',
    domains = new Set([
      'aol.com',
      'gmail.com',
      'google.com',
      'yahoo.com',
      'ymail.com',
      'hotmail.com',
      'live.com',
      'outlook.com',
      'inbox.com',
      'mail.com',
      'gmx.com',
      'icloud.com'
    ]),
    suggestionColor = 'gray'
  } = {}
) => {
  return new Promise((resolve, reject) => {
    const { stdout, stdin } = process
    const isRaw = stdin.isRaw
    const forceLowerCase = true
    const abortChars = new Set(['\u0003'])
    const resolveChars = new Set(['\r'])
    const allowInvalidChars = false
    const autoCompleteChars = new Set([
      '\t' /* tab */,
      '\r' /* return */,
      '\x1b[C' /* right arrow */,
      ' ' /* Spacebar */
    ])

    // Some environments (e.g., cygwin) don't provide a tty
    if (!stdin.setRawMode) {
      return reject(new Error('stdin lacks setRawMode support'))
    }

    stdout.write(start)
    stdin.setRawMode(true)
    stdin.resume()

    const restore = () => {
      stdout.write('')
      stdin.setRawMode(isRaw)
      stdin.pause()
      stdin.removeListener('data', onData)
    }

    let val = ''
    let suggestion = ''
    let caretOffset = 0

    // To make `for..of` work with buble
    const _domains = Array.from(domains)

    const onData = buffer => {
      const data = buffer.toString()

      // Abort upon ctrl+C
      if (abortChars.has(data)) {
        restore()
        return reject(new Error('User abort'))
      }

      let completion = ''

      // If we have a suggestion *and*
      // the user is at the end of the line *and*
      // the user pressed one of the keys to trigger completion
      if (suggestion !== '' && !caretOffset && autoCompleteChars.has(data)) {
        val += suggestion
        suggestion = ''
      } else {
        if (data === '\x1b[D') {
          if (val.length > Math.abs(caretOffset)) {
            caretOffset--
          }
        } else if (data === '\x1b[C') {
          if (caretOffset < 0) {
            caretOffset++
          }
        } else if (data === '\x08' || data === '\x7f') {
          // Delete key needs splicing according to caret position
          val =
            val.substr(0, val.length + caretOffset - 1) +
            val.substr(val.length + caretOffset)
        } else {
          if (resolveChars.has(data)) {
            restore()
            return resolve(val)
          }

          if (!allowInvalidChars) {
            // Disallow more than one @
            if (/@/.test(val) && data === '@') {
              return
            }

            if (/[^A-z0-9-+_.@]/.test(data)) {
              return
            }
          }

          const add = forceLowerCase ? data.toLowerCase() : data
          val =
            val.substr(0, val.length + caretOffset) +
            add +
            val.substr(val.length + caretOffset)
        }

        const parts = val.split('@')
        if (parts.length === 2 && parts[1].length > 0) {
          const [, _host] = parts
          const host = _host.toLowerCase()
          for (const domain of _domains) {
            if (host === domain) {
              break
            }

            if (host === domain.substr(0, host.length)) {
              suggestion = domain.substr(host.length)
              completion = chalk[suggestionColor](suggestion)
              completion += ansi.cursorBackward(domain.length - host.length)
              break
            }
          }
        }

        if (completion.length < 0) {
          suggestion = ''
        }
      }

      stdout.write(ansi.eraseLines(1) + start + val + completion)
      if (caretOffset) {
        stdout.write(ansi.cursorBackward(Math.abs(caretOffset)))
      }
    }

    stdin.on('data', onData)
  })
}
