import Ajv from "ajv";
import { createSchema, updateSchema } from "./schemas";

export const getCreateValidator = () => {
  const ajv = new Ajv();
  return ajv.compile(createSchema);
}

export const getUpdateValidator = () => {
  const ajv = new Ajv();
  return ajv.compile(updateSchema);
}