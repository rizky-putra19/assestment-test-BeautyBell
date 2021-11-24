'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userBills.belongsTo(models.users, {as: 'userBills', foreignKey: 'userId'})
    }
  };
  userBills.init({
    subTotal: DataTypes.INTEGER,
    taxSubTotal: DataTypes.INTEGER,
    grandTotal: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userBills',
  });
  return userBills;
};