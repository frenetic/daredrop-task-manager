export const createSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},
    isDone: {type: "boolean"},
  },
  required: ["name", "description", "isDone"],
  additionalProperties: false,
};

export const updateSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},
    isDone: {type: "boolean"},
    id: {type: "string"},
  },
  required: ["name", "description", "isDone"],
  additionalProperties: false,
};

export const partialUpdateSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    description: {type: "string"},
    isDone: {type: "boolean"},
    id: {type: "string"},
  },
  required: [],
  additionalProperties: false,
};
