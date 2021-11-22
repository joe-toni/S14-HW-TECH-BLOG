const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class User extends Model {}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        userName:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                len: { args: [6, 15], msg: 'Please enter a password larger than 6 but shorter than 15 characters'},
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });

    module.exports = User;