const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

// Shouldn't redefine associations without aliases
User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist, as: 'readers' })

// Readinglist.belongsTo(User)
Readinglist.belongsTo(Blog)
// User.hasMany(Readinglist)
Blog.hasMany(Readinglist)

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, Readinglist, Session
}