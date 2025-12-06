require('dotenv').config();

const mysqlConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
};

const sqliteConfig = {
  dialect: 'sqlite',
  storage: './db.development.sqlite'
};

const isMySqlAvailable = () => {
  try {
    require('mysql2');
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  development: isMySqlAvailable() ? mysqlConfig : sqliteConfig,
  test: isMySqlAvailable() ? {
    ...mysqlConfig,
    database: process.env.DB_DATABASE_TEST, logging:false
  } : { ...sqliteConfig, storage: './db.test.sqlite' },
  production: mysqlConfig,
};



