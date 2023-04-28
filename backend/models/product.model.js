const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buy_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sell_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    img_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product;
