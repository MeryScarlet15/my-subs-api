import { userAuthSwaggerPath } from "./user-auth.swagger";
import { userIdSwaggerPath } from "./user-id.swagger";
import { userLoginSwaggerPath } from "./user-login.swagger";
import { userLogoutSwaggerPath } from "./user-logout.swagger";

export const userSwaggerPath = {
  "/user": {
    get: {
      description: "Get all users",
      tags: ["User"],
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/IUser" },
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
      description: "Register user",
      tags: ["User"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                email: {
                  type: "string",
                },
                name: { type: "string" },
                lastname: { type: "string" },
                password: { type: "string" },
                rol: { type: "string", enum: ["ADMIN", "ACCOUNT"] },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "The user has been registered",
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
  ...userIdSwaggerPath,
  ...userLoginSwaggerPath,
  ...userLogoutSwaggerPath,
  ...userAuthSwaggerPath,
};
