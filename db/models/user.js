'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../../config/database');
const serverError = require('../../utils/serverError');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2'),
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
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'firstName cannot be null',
      },
      notEmpty: {
        msg: 'firstName cannot be empty',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'lastName cannot be null',
      },
      notEmpty: {
        msg: 'lastName cannot be empty',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'email cannot be null',
      },
      notEmpty: {
        msg: 'email cannot be empty',
      },
      isEmail: {
        msg: 'Invalid email id',
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password cannot be null',
      },
      notEmpty: {
        msg: 'password cannot be empty',
      },
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value){
      if(this.password.length < 7){
        throw new serverError('Password lenth must be grater than 7', 400)
      }
      if(value === this.password){
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword); 
      } else{
        throw new serverError('Password and confirm password need to be the same', 400)
      }
    }//it will be encrypt the password before it goes to the db
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
  }
}, 
{
  paranoid: true,
  freezeTableName: true,
  modelName: 'user'
}
);