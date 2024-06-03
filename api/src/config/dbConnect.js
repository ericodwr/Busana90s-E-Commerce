const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbDialect = 'mysql';

const sequalizeConnection = new Sequelize(dbName, dbUsername, dbPass, {
  host: dbHost,
  dialect: dbDialect,
});

module.exports = { sequalizeConnection };
