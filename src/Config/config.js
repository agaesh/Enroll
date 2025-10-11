/**
 * Sequelize database configuration for the 'development' environment.
 * This file uses ES6 module syntax (`export default`).
 */

export default {
  development: {
    // Uses environment variable DB_USER, falling back to 'root'
    username: process.env.DB_USER || 'root',
    
    // Uses environment variable DB_PASS, falling back to null (no password)
    password: process.env.DB_PASS || null,
    
    // Uses environment variable DB_NAME, falling back to 'EnrolNow'
    database: process.env.DB_NAME || 'EnrolNow',
    
    // Uses environment variable DB_HOST, falling back to '127.0.0.1' (localhost)
    host: process.env.DB_HOST || '127.0.0.1',
    
    // Specifies the database dialect
    dialect: 'mysql'
  }
};