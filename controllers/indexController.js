/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 20-06-2022
 * @desc All the magic goes here
 */

const openpgp = require("openpgp");
const {
  writeFileSync
} = require("fs");
const axios = require('axios');
openpgp.config.showComment = false;
openpgp.config.showVersion = false;
const {
  validateDataEnc,
  validateDataDec,
  validateDataKeys,
} = require("../helpers/validations");

const index = {
  generateKeys: async (req, res, next) => {
    const {
      error
    } = validateDataKeys(req.params);
    if (error) return next(error);

    const {
      email,
      passphrase
    } = req.params;

    await openpgp
      .generateKey({
        userIDs: [{
          email
        }],
        curve: "ed25519",
        passphrase,
      })
      .then((keys) => {

        writeFileSync("./keys/publicKey.txt", keys.publicKey);
        writeFileSync("./keys/privateKey.txt", keys.privateKey);

        res.status(200).json({
          status: 200,
          success: true,
          response: "🆗 Keys generated",
        });
      })
      .catch((err) => {
        next(err);
      });
  },
  encryptRouter: async (req, res, next) => {
    const {
      error
    } = validateDataEnc(req.body);
    if (error) return next(error);

    let rpublicKey, getkey;

    const {
      publicKey,
      secretmessage
    } = req.body;
    //return res.status(422).jsonp(req.body);

    try {
      getkey = await axios.get(publicKey);
    } catch (err) {
      next(err);
    }

    try {
      rpublicKey = await openpgp.readKey({
        armoredKey: getkey.data
      });
    } catch (err) {
      err.message.includes("Misformed armored text") ? next(new Error("Invalid Public Key")) : next(err)
    }

    try {
      const encrypted = await openpgp
        .encrypt({
          message: await openpgp.createMessage({
            text: secretmessage
          }),
          encryptionKeys: rpublicKey
        });
      /* console.log(encrypted); */
      writeFileSync("./keys/encrypted/encMessage.txt", encrypted);
      res.status(200).json({
        status: 200,
        response: "🆗",
        message: "✔️ Successfully encrypted"
      });
    } catch (error) {
      next(error)
    }
  },
  decryptRouter: async (req, res, next) => {
    const {
      error
    } = validateDataDec(req.body);
    if (error) return next(error);

    const {
      privateKey,
      encMessage,
      passphrase
    } = req.body;
    // return res.status(422).jsonp(req.body);

    let encryptedMessage, readedPrivateKey;
    try {
      encryptedMessage = await openpgp.readMessage({
        armoredMessage: (await axios.get(encMessage)).data // parse armored message
      });
    } catch (error) {
      next(error);
    }

    try {
      readedPrivateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({
          armoredKey: (await axios.get(privateKey)).data
        }),
        passphrase
      });
    } catch (error) {
      next(error);
    }

    try {
      const {
        data: decrypted,
        signatures
      } = await openpgp.decrypt({
        message: encryptedMessage,
        //verificationKeys: publicKey, // optional
        decryptionKeys: readedPrivateKey
      });
      //console.log(decrypted);
      writeFileSync("./keys/decrypted/decMessage.txt", decrypted);
      res.status(200).json({
        status: 200,
        response: "🆗",
        message: "✔️ Successfully decrypted"
      });
    } catch (error) {
      next(error);
    }

    // check signature validity (signed messages only)
    /* try {
      await signatures[0].verified; // throws on invalid signature
      console.log('Signature is valid');
    } catch (e) {
      throw new Error('Signature could not be verified: ' + e.message);
    } */
  },
};

module.exports = index;