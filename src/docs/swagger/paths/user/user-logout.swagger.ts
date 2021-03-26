export const userLogoutSwaggerPath = {
  "/user/logout": {
    post: {
      description: "Logout user",
      tags: ["User"],
      responses: {
        "200": {
          description: "Logout successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
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
