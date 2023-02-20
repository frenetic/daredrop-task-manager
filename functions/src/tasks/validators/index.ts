import Ajv from "ajv";
import {createSchema, partialUpdateSchema, updateSchema} from "./schemas";

export const getCreateValidator = () => {
  const ajv = new Ajv();
  return ajv.compile(createSchema);
};

export const getUpdateValidator = () => {
  const ajv = new Ajv();
  return ajv.compile(updateSchema);
};

export const getPartialUpdateValidator = () => {
  const ajv = new Ajv();
  return ajv.compile(partialUpdateSchema);
};
