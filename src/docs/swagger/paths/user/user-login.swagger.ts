export const userLoginSwaggerPath = {
  "/user/login": {
    post: {
      description: "Login user",
      tags: ["User"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                email: {
                  type: "string",
                },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "The user has been logged",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  authToken: {
                    type: "string",
                  },
                },
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
