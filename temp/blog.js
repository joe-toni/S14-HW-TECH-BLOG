const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const uuid = require('uuid');
class Blog extends Model {}

Blog.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        userId:
        {
            type: DataTypes.INTEGER,
            references: 
            {
                model: 'user',
                key: 'id'
            }
        },
        blogName:
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        content:
        {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    });

    module.exports = Blog;