import fs from 'fs';
import path from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import configFile from '../../Config/config.js';

// __dirname replacement for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const basename = path.basename(__filename);

// Use the correct environment (you can switch to process.env.NODE_ENV if needed)
const config = configFile.development;

const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Dynamically import all models in this folder
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.endsWith('.js')
  );

for (const file of files) {
  const { default: modelDefiner } = await import(path.join(__dirname, file));
  const model = modelDefiner(sequelize, DataTypes);
  db[model.name] = model;
}

// Set up associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;

export default db;

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;