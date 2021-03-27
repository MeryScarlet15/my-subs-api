import swaggerPaths from "../../docs/swagger/paths";
import swaggerSchemas from "../../docs/swagger/schemas";
import fs from "fs";

const getSwaggerJson = async () => {
  const stringSwaggerJson = await fs.promises.readFile(__dirname + "../../../../swagger.json", "utf8");
  return JSON.parse(stringSwaggerJson);
};

const getSwaggerSchemas = () => {
  let newSwaggerSchemas = {};
  for (let key of Object.keys(swaggerSchemas)) {
    newSwaggerSchemas = { ...newSwaggerSchemas, ...swaggerSchemas[key] };
  }

  return newSwaggerSchemas;
};

const getSwaggerPaths = () => {
  let newSwaggerPaths = {};
  for (let key of Object.keys(swaggerPaths)) {
    newSwaggerPaths = { ...newSwaggerPaths, ...swaggerPaths[key] };
  }

  return newSwaggerPaths;
};

export const generateSwaggerJson = async () => {
  const schemas = getSwaggerSchemas();
  const paths = getSwaggerPaths();
  const lastSwaggerJson = await getSwaggerJson();
  let swaggerJson = { ...lastSwaggerJson };

  swaggerJson.paths = paths;
  swaggerJson.components.schemas = schemas;

  fs.writeFile(__dirname + "../../../../swagger.json", JSON.stringify(swaggerJson), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("swagger.json generated successfully");
  });
};
