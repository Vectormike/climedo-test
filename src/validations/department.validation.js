const Joi = require('@hapi/joi');
const { apiKey } = require('./custom.validation');

const createDepartment = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    apiKey: Joi.string().required().custom(apiKey),
    contactName: Joi.string().required(),
    contactEmail: Joi.string().required().email(),
    telephone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};

module.exports = {
  createDepartment,
};
