export const getErrorIdMongo = (id: string, entity: string) => {
  const isValidId = id && id.length === 24;

  if (!isValidId) {
    throw { name: "ERROR_NOT_EXISTING_IN_BBDD", param: entity };
  }
};
