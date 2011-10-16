mongo = require 'mongoskin'

module.exports =
  init: (db = 'localhost:27017/teamtalk', collection_name = 'users') ->
    @db = mongo.db(db)
    @users = @db.collection(collection_name)
  all: -> @users.find().sort({created_at: -1}).toArray()
  add: (user, cb) ->
    user.created_at = new Date()
    @users.insert user, cb
    console.log 'add user'
  findOrCreate: (twitter, cb) -> 
    @add twitter
    @users.find({screen_name: twitter.screen_name}, {sort: created_at: -1}).toArray (err, user) ->
      if user then cb(err, user) else @add(twitter, cb)
