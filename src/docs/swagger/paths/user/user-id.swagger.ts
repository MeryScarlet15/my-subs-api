export const userIdSwaggerPath = {
  "/user/{id}": {
    delete: {
      description: "Logic delete user",
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of user to delete",
          required: true,
          schema: {
            type: "string",
          },
          style: "simple",
        },
      ],
      responses: {
        "200": {
          description: "The user has been deleted",
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
        "403": {
          description: "ERROR - Error not enouth permisions",
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
    patch: {
      description: "Updates one user",
      tags: ["User"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of user to update",
          required: true,
          schema: {
            type: "string",
          },
          style: "simple",
        },
      ],
      responses: {
        "200": {
          description: "The user has been updated",
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
        "403": {
          description: "ERROR - Error not enouth permisions",
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
