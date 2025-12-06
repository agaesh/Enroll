/**
 * Sequelize database connection setup using ES6 modules.
 * It imports the database configuration from './database.config.js'.
 */
import { Sequelize } from 'sequelize';

// Import the default export (the configuration object) from the config file.
// Note: The original CJS referred to './config', but we use the actual file name.
import configModule from '../Config/config.js'; 

// Destructure the specific 'development' environment configuration.
const config = configModule.development;

// Initialize Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);
// Export the initialized Sequelize instance
export default sequelize;