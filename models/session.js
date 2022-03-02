const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Session extends Model {}Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session'
})

module.exports = Session
