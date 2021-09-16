import Joi from "joi";
import logger from "../Config/Logger";
import { AddCodeInterface } from "../DataTypes/Types";
import Code from "../Models/Code";

export const getAll = () => {
  return new Promise((resolve, reject) => {
    logger.info("Getting all the codes from database");
    Code.find({})
      .then((response) => {
        logger.info(`Got ${response.length} entries from database`);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addNewCode = (codes: Array<AddCodeInterface>) => {
  return new Promise((resolve, reject) => {
    logger.info("Adding new code to the database");
    Code.insertMany(codes)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const validateData = (data: any, schema: Joi.ArraySchema) => {
  return schema.validate(data, { abortEarly: false });
};

export const searchCodeByTags = (searchTitle: string) => {
  return new Promise((resolve, reject) => {
    logger.info("Searching codes by it's tags from database");
    Code.find({ tags: { $all: searchTitle.toLowerCase().split(",") } })
      .then((response) => {
        logger.info(`got ${response.length} entries from database`);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const searchCodeByCategory = (searchCategory: string) => {
  return new Promise((resolve, reject) => {
    logger.info("Searching codes by category it's title from database");
    Code.find({ category: searchCategory.toLowerCase() })
      .then((response) => {
        logger.info(`got ${response.length} entries from database`);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
