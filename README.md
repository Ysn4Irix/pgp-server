<h1 align="center">Pretty Good Privacy Server</h1>

An API for encypting & decrypting messages using Pretty Good Privacy encryption protocol using [NodeJS](https://nodejs.org) & [openpgp](https://www.openpgp.org) libary

This api demonstrate how we can use pgp protocol to send and recieve text messages

PGP is used for signing, encrypting, and decrypting texts, e-mails, files, directories, and whole disk partitions and to increase the security of e-mail communications

## Installation

API requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and start the production.

```sh
git clone https://github.com/Ysn4Irix/pgp-server.git
cd pgp-server
npm install
npm start or npm run devStart
```

## Usage

### Generate Keys

Generate your public & private keys (keys will be located in keys directory)

```endpoint
GET /api/keys/generate/YourEmail/YourPassword
```

#### Example response

```json
{
  "status": 200,
  "success": true,
  "response": "🆗 Keys generated"
}
```

### Encrypt your text message

Encrypt your message (encrypted message will located in keys/encrypted directory )

```endpoint
POST /api/enc
```

#### Example request body

```json
{
  "publicKey": "must be a direct file link",
  "secretmessage": "your text message"
}
```

#### Example response

```json
{
  "status": 200,
  "response": "🆗",
  "message": "✔️ Successfully encrypted"
}
```

### Decrypt your text message

Decrypt your message (decrypted message will located in keys/decrypted directory )

```endpoint
POST /api/dec
```

#### Example request body

```json
{
  "privateKey": "must be a direct file link",
  "encMessage": "must be a direct file link",
  "passphrase": "Your Password"
}
```

#### Example response

```json
{
  "status": 200,
  "response": "🆗",
  "message": "✔️ Successfully encrypted"
}
```

## License

MIT
