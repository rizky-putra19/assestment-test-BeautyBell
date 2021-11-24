'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taxObjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      taxObjects.belongsTo(models.users, {as: 'taxObjects', foreignKey: 'userId'})
    }
  };
  taxObjects.init({
    name: DataTypes.STRING,
    taxCode: DataTypes.ENUM('1', '2', '3'),
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'taxObjects',
  });
  return taxObjects;
};