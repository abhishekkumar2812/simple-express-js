const Sequelize = require("sequelize");

// async function Database(env) {
//   console.log("Environment ->", env);

//   let database = new Sequelize(name, username, password, {
//     host: host,
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000,
//     },
//     logging: false,
//   });
//   return database;
// }

// module.exports = { Database };

const connection = {
  DBConfig: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    // database: "",
    // username: "",
    // password: "",
    // host: "",
    // dialect: "",
  },
};
// const connection = require('./connection');

const database = new Sequelize(
  connection.DBConfig.database,
  connection.DBConfig.username,
  connection.DBConfig.password,
  {
    host: connection.DBConfig.host,
    dialect: connection.DBConfig.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = database;
