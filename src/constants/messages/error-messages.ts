export interface IErrorResponse {
  status: number;
  code: string;
  message: string;
}

const getEntityParsed = (entity: string): { entityCode: string; entityMessage: string } => {
  const delimeters = [" ", "-", "_"];
  const replaceCodeRegex = /\s|-/g;
  const replaceMessageRegex = /-|_/g;

  const entityCode = entity ? entity.toUpperCase().replace(replaceCodeRegex, "_") : "";
  const entityMessage = entity ? entity.replace(replaceMessageRegex, " ") : "";
  return {
    entityCode,
    entityMessage,
  };
};

export const errorMessages = {
  ERROR_BODY_PARAMS: (param: string): IErrorResponse => {
    return {
      status: 400,
      code: "ERROR_BODY_PARAMS",
      message: `Need ${param} attribute`,
    };
  },
  ERROR_EXISTING_IN_BBDD: (entity: string): IErrorResponse => {
    const { entityCode, entityMessage } = getEntityParsed(entity);
    return {
      status: 400,
      code: `ERROR_EXISTING_${entityCode}`,
      message: `${entityMessage || ""} already exists`,
    };
  },
  ERROR_NOT_EXISTING_IN_BBDD: (entity: string): IErrorResponse => {
    const { entityCode, entityMessage } = getEntityParsed(entity);

    return {
      status: 400,
      code: `ERROR_NOT_EXISTING_${entityCode}`,
      message: `${entityMessage || ""} not exists`,
    };
  },
  ERROR_BAD_CREDENTIALS: {
    status: 400,
    code: "ERROR_BAD_CREDENTIALS",
    message: "Bad credentials",
  },
  ERROR_NOT_AUTH: {
    status: 401,
    code: "ERROR_NOT_AUTH",
    message: "Please authenticate",
  },
  ERROR_NOT_ENOUGH_PERMISIONS: {
    status: 403,
    code: "ERROR_NOT_ENOUGH_PERMISIONS",
    message: "User doesn't have permisions",
  },
  SERVER_ERROR: {
    status: 500,
    code: "SERVER_ERROR",
    message: "Server error",
  },
};
