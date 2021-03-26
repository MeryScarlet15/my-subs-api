export const userAuthSwaggerPath = {
  "/user/auth": {
    get: {
      description: "Get user auth",
      tags: ["User"],
      responses: {
        "200": {
          description: "User auth successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { $ref: "#/components/schemas/IUser" },
              },
            },
          },
        },
        "400": {
          description: "ERROR - Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "ERROR - Error not authenticated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IErrorResponse",
              },
            },
          },
        },
        "500": {
          description: "ERROR - Server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
