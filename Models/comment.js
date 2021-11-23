const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}

Comment.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        blogId:
        {
            type: DataTypes.INTEGER,
            references: 
            {
                model: 'blog',
                key: 'id'
            }
        },
        commenterId:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'user',
                key: 'id'
            }

        },
        comment:
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
        modelName: 'comment',
    });

    module.exports = Comment;