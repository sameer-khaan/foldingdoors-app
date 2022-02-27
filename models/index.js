"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize, Op } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const dbConnection = {};

let connection;
if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], config);
} else {
  connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

connection
  .authenticate()
  .then(() => {
    console.log("DB Connected to " + config.host);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = connection["import"](path.join(__dirname, file));
    dbConnection[model.name] = model;
  });

Object.keys(dbConnection).forEach((modelName) => {
  if (dbConnection[modelName].associate) {
    dbConnection[modelName].associate(dbConnection);
  }
});

dbConnection.sequelize = connection;
dbConnection.Sequelize = Sequelize;
dbConnection.DataTypes = Sequelize.DataTypes;
dbConnection.Op = Op;

module.exports = dbConnection;
