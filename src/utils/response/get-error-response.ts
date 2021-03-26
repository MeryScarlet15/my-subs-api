import { errorMessages } from "../../constants/messages/error-messages";

export interface IGetErrorResponse<TBody = any> {
  requestName: string;
  bodyparams: TBody;
  error: any;
}
export const getErrorResponse = ({ requestName, bodyParams, error }) => {
  console.error(requestName);
  console.error(bodyParams);
  console.error(error);

  let completeError = undefined;

  if (typeof error !== "string" && error.param) {
    completeError = errorMessages[error.name](error.param);
  } else {
    completeError = errorMessages[error];
  }

  if (!completeError) {
    completeError = errorMessages["SERVER_ERROR"];
  }

  return completeError;
};
