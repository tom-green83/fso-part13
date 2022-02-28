const Blog = require('./blog')
const User = require('./user')
const Readlinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: Readlinglist })

module.exports = {
  Blog, User
}