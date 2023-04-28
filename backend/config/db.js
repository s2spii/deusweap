const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("deusweap", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
