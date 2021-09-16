import Joi from "joi";

const schema = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    code: Joi.string().required(),
    category: Joi.string().required(),
    subCategory: Joi.string(),
    language: Joi.string().required(),
    metaData: Joi.object({
      userId: Joi.string().required(),
    }).required(),
  })
);

export default schema;
