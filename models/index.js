const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

// Shouldn't redefine associations
// Blog.belongsToMany(User, { through: Readinglist })
// User.belongsToMany(Blog, { through: Readinglist })

Readinglist.belongsTo(User)
Readinglist.belongsTo(Blog)
User.hasMany(Readinglist)
Blog.hasMany(Readinglist)


module.exports = {
  Blog, User, Readinglist
}