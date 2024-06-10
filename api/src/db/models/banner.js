'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'adminId', as: 'user' });
    }
  }
  Banner.init(
    {
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 4,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      adminId: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Banner',
    },
  );
  return Banner;
};
