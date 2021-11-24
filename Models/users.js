const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class User extends Model 
{
    checkPassword(loginPassword){return bcrypt.compareSync(loginPassword, this.password);}
}

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
        hooks: {
          async beforeCreate(newUserData) 
          {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          async beforeBulkCreate(newUsers)
          {
              for(const user of newUsers)
              {
                  user.password = await bcrypt.hash(user.password, 10);
              }
              return newUsers;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
    );

    module.exports = User;