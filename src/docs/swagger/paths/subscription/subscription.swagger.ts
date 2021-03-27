import { subscriptionIdSwaggerPath } from "./subscription-id.swagger";

export const subscriptionSwaggerPath = {
  "/subscription": {
    get: {
      description: "Get all and filtered subscriptions",
      tags: ["Subscription"],
      responses: {
        "200": {
          description: "List of subscriptions",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/ISubscription" },
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

    post: {
      description: "Create subscription",
      tags: ["Subscription"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              required: ["name", "cost", "paidPeriod"],
              properties: {
                name: { type: "string" },
                cost: { type: "string" },
                paidPeriod: { type: "string", enum: ["WEEK", "MONTH", "YEAR"] },
                isPaid: { type: "boolean" },
                note: { type: "string" },
                renovationDate: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "The subscription has been created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { $ref: "#/components/schemas/ISubscription" },
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
  ...subscriptionIdSwaggerPath,
};
