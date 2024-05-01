const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define('project',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userType cannot be null',
        },
        notEmpty: {
          msg: 'userType cannot be empty',
        },
      },
    },
    isFeatured:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true,false]],
          msg: 'isFeatured value must be true or false',
        },
      },
    },
    productImage:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'productImage cannot be null',
        },
      },
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be null',
        },
        isDecimal: {
          msg: 'price value must be in decimal',
        },
      },
    },
    shortDescription:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shortDescription cannot be null',
        },
        notEmpty: {
          msg: 'shortDescription cannot be empty',
        },
      },
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description cannot be null',
        },
        notEmpty: {
          msg: 'description cannot be empty',
        },
      },
    },
    productUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userType cannot be null',
        },
        notEmpty: {
          msg: 'userType cannot be empty',
        },
        isUrl: {
          msg: 'Invalid productUrl string',
        },
      },
    },
    category:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notNull: {
          msg: 'category cannot be null',
        },
      },
    },
    tags:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notNull: {
          msg: 'tags cannot be null',
        },
      },
    },
    createdBy:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'project',
  },
);