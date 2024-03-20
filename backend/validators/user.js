const Joi = require("joi");

module.exports = class {
  static login(payload) {
    const schema = {
      email: Joi.string().email({ tlds: false }).required().min(3).max(50),
      password: Joi.string().required().min(3).max(50),
    };

    return Joi.object(schema).validate(payload);
  }

  static register(payload) {
    const schema = {
      name: Joi.string().required().min(3).max(50),
      email: Joi.string().email({ tlds: false }).required().min(3).max(50),
      password: Joi.string().required().min(3).max(50),
    };

    return Joi.object(schema).validate(payload);
  }

  static verify(payload) {
    const schema = {
      email: Joi.string().email({ tlds: false }).required().min(3).max(50),
      otp: Joi.string().required().length(4),
    };

    return Joi.object(schema).validate(payload);
  }

  static resend(payload) {
    const schema = {
      email: Joi.string().email({ tlds: false }).required().min(3).max(50),
    };

    return Joi.object(schema).validate(payload);
  }
};
