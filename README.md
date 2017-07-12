# prompt-email [![Build Status](https://travis-ci.org/bukinoshita/prompt-email.svg?branch=master)](https://travis-ci.org/bukinoshita/prompt-email)
> Command line interface prompt email with autocompletion, validation and email lookup


## Install
```bash
$ npm install prompt-email
```


## Usage
```javascript
import promptEmail from 'prompt-email'

promptEmail()
  .then(email => console.log(`\n> Hello ${email}`))
  .catch(err => console.log('\n> Abort'))

// => > Hello bukinoshita@gmail.com
```

_It uses [email-prompt](https://github.com/zeit/email-prompt) under the hood with a [couple changes](https://github.com/bukinoshita/prompt-email/blob/master/lib/email-prompt.js)._


## Demo

![](https://github.com/bukinoshita/prompt-email/blob/master/demo.gif)


## How it works

It tries to [find the username of the current user](https://github.com/bukinoshita/prompt-email/blob/master/lib/get-email.js) and [get the email of the npm user using the username](https://github.com/bukinoshita/prompt-email/blob/master/lib/get-email.js). It's not a solution 100% bulletproof, that's why if it can't find the email it will prompt the user for their email. I also added the `verify` param so you can skip that verification and direct prompt the user.


## API

### promptEmail({ verify })

#### verify

Type: `boolean`<br/>
Default: true

If set to `false`, it will skip the email lookup and will prompt for email.


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
