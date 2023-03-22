import path from 'path';
import fs from 'fs'; //file system

let models = {};

//__dirname = /Users/vladimirkopanko/sequlize-course/src/models/index.js

export function registerModels(sequelize) {
  const thisFile = path.basename(__filename); //index;
  const modelFiles = fs.readFileSync(__dirname);

  const filterModuleFiles = modelFiles.filter((file) => {
    return file !== thisFile && file.slice(-3) === '.js';
  });

  for (const file of filterModuleFiles) {
    const model = require(path.join(__dirname, file)).default(sequelize); // explain default
    models[model.name] = model;
  }

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models.sequelize = sequelize;
}

export default models;
