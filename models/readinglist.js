const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Readinglist extends Model {}Readinglist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    default: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readinglist'
})

module.exports = Readinglist
