export const userSwaggerSchema = {
  IUser: {
    type: "object",
    required: ["_id", "email", "password", "rol", "tokens"],
    properties: {
      _id: {
        type: "integer",
      },
      email: {
        type: "string",
      },
      name: { type: "string" },
      lastname: { type: "string" },
      password: { type: "string" },
      tokens: { type: "array", items: { type: "string" } },
      deletedAt: { type: "string" },
    },
  },
};
