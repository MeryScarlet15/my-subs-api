import express, { Router } from "express";

export type TRequest<body = any, query = any> = express.Request<any, any, body, query>;

export type TResponse<response = any> = express.Response<response>;
