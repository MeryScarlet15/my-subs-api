export const errorSwaggerSchema = {
  IErrorResponse: {
    type: "object",
    required: ["status", "code", "message"],
    properties: {
      status: { type: "string" },
      code: { type: "string" },
      message: { type: "string" },
    },
  },
};
