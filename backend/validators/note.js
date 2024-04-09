const Joi = require("joi");

module.exports = class {
  static create(payload) {
    const schema = {
      title: Joi.string().allow(""),
      text: Joi.string().allow(""),
      autoSync: Joi.boolean(),
    };

    return Joi.object(schema).validate(payload);
  }

  static update(payload) {
    const schema = {
      _id: Joi.string().required(),
      title: Joi.string(),
      text: Joi.string(),
      lastSync: Joi.string().isoDate().required(),
    };

    return Joi.object(schema).validate(payload);
  }
};
