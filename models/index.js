const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: Readinglist })

module.exports = {
  Blog, User, Readinglist
}