'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Broadcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'adminId', as: 'user' });
    }
  }
  Broadcast.init(
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminId: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Broadcast',
    },
  );
  return Broadcast;
};
