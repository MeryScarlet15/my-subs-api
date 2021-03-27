export const subscriptionIdSwaggerPath = {
  "/subscription/{id}": {
    delete: {
      description: "Logic delete subscription",
      tags: ["Subscription"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Subscription id to delete",
          required: true,
          schema: {
            type: "string",
          },
          style: "simple",
        },
      ],
      responses: {
        "200": {
          description: "The subscription has been deleted",
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
    put: {
      description: "Updates one subscription",
      tags: ["Subscription"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Subscription Id to update",
          required: true,
          schema: {
            type: "string",
          },
          style: "simple",
        },
      ],
      responses: {
        "200": {
          description: "The subscription has been updated",
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
