# prompt-email
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

_It uses [email-prompt](https://github.com/zeit/email-prompt) under the hood with a couple changes._

## Demo

<img src="https://cldup.com/CrP2LR-8B8.gif"/>

## How it works

We [find the username of the current user]() and we [get the email of the npm user using the username](). It's not a solution 100% bullet proof, that's why I also added the `verify` param so you can skip that verification and direct prompt the user.

## API

### promptEmail({ verify })

#### verify

Type: `boolean`<br/>
Default: true

If set to `false`, it will skip the email lookup and will prompt for email.

## License

[MIT](https://raw.githubusercontent.com/bukinoshita/prompt-email/master/LICENSE) &copy; Bu Kinoshita
