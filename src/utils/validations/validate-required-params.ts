const getUndefinedParams = (params) => {
  return Object.values(params).findIndex((value) => value === undefined || value === "" || value === null);
};

//Detect if there are any undefined body param
// Pass only de required params
export const validateRequiredParams = (params: { [key: string]: string | boolean | number }): void => {
  const undefinedParams = getUndefinedParams(params);
  if (undefinedParams !== -1) {
    const undefinedKey = Object.keys(params)[undefinedParams];
    throw { name: "ERROR_BODY_PARAMS", param: undefinedKey };
    return;
  }

  return;
};
