/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 17-09-2021
 * @modify date 20-06-2022
 * @desc Schema Validation of data
 */

const Joi = require("joi");

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateDataKeys = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    passphrase: Joi.string()
      .trim()
      .required()
      .pattern(new RegExp(/^[\w\-]+$/i))
      .min(6)
      .error(
        new Error(
          "Passphrase is required and length must be more than 6 & contains numbers & caracters"
        )
      ),
  });
  return schema.validate(data, options);
};

const validateDataEnc = (data) => {
  const schema = Joi.object({
    publicKey: Joi.string()
      .trim()
      .required()
      .error(new Error("Public Key is required")),
    secretmessage: Joi.string()
      .trim()
      .required()
      .error(new Error("Secret Message is required")),
  });
  return schema.validate(data, options);
};

const validateDataDec = (data) => {
  const schema = Joi.object({
    privateKey: Joi.string()
      .trim()
      .required().uri()
      .error(new Error("Private Key is required")),
    encMessage: Joi.string()
      .trim()
      .required()
      .error(new Error("Secret Message is required")),
    passphrase: Joi.string()
      .trim()
      .required()
      .pattern(new RegExp(/^[\w\-]+$/i))
      .min(6)
      .error(
        new Error(
          "Passphrase is required and length must be more than 6 & contains numbers & caracters"
        )
      ),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateDataEnc,
  validateDataDec,
  validateDataKeys
};