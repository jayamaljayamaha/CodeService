import {
  BadRequestError,
  DataValidationError,
  InternalServerError,
  ValidationErrorType,
} from "exception-library";
import { Request, Response, NextFunction } from "express";
import logger from "../Config/Logger";
import { AddCodeInterface } from "../DataTypes/Types";
import {
  addNewCode,
  getAll,
  searchCodeByCategory,
  searchCodeByTags,
  validateData,
} from "../Services/CodesService";
import AddCodeSchema from "../ValidationSchemas/AddCodeSchema";

export const getAllCodes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("get a request to get all the codes");
  getAll()
    .then((response) => {
      logger.info("got all the codes successfully");
      res.status(200).send(response);
    })
    .catch((err) => {
      logger.error(`Exception happened when getting all the codes ${err}`);
      next(new InternalServerError(err.message));
    });
};

export const addNewCodes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("get a request to add a new code and user is authorized");
  const body: Array<AddCodeInterface> = req.body;
  logger.info("Validating body");
  const { error } = validateData(body, AddCodeSchema);

  if (error) {
    logger.error(`Invalid data in body: ${error}`);
    const errors: ValidationErrorType[] = error.details.map((detail) => {
      const err: ValidationErrorType = {
        message: detail.message,
        field: detail.context?.label,
        errorType: detail.type,
      };
      return err;
    });
    throw new DataValidationError(errors);
  }
  logger.info("Data validated successfully");
  addNewCode(body)
    .then((response) => {
      logger.info(`Added a new code successfully: ${JSON.stringify(response)}`);
      res.status(201).send(response);
    })
    .catch((err) => {
      logger.error(`Exception happened when adding new code: ${err}`);
      next(new InternalServerError(err.message));
    });
};

export const searchCodes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("get a request to search codes");
  const searchTags = req.query.tags?.toString();
  const searchCategory = req.query.category?.toString();
  if (!searchTags && !searchCategory) {
    logger.error("Search phrase is not defined");
    throw new BadRequestError("Search phrase is not defined");
  }

  if (searchTags && searchCategory) {
    logger.error("Only one search phrase can be defined");
    throw new BadRequestError("Only one search phrase can be defined");
  }

  if (searchTags) {
    searchCodeByTags(searchTags)
      .then((response) => {
        logger.info("Searched codes by tags successfully");
        res.status(200).send(response);
      })
      .catch((err) => {
        logger.error("Exception happened when searching codes by tags");
        next(new InternalServerError(err.message));
      });
  } else if (searchCategory) {
    searchCodeByCategory(searchCategory)
      .then((response) => {
        logger.info("Searched codes by category successfully");
        res.status(200).send(response);
      })
      .catch((err) => {
        logger.error("Exception happened when searching codes by category");
        next(new InternalServerError(err.message));
      });
  }
};
