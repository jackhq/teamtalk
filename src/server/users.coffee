mongo = require 'mongoskin'

module.exports =
  init: (db = 'localhost:27017/teamtalk', collection_name = 'users') ->
    @db = mongo.db(db)
    @users = @db.collection(collection_name)
  all: -> @users.find().sort({created_at: -1}).toArray()
  add: (user, cb) ->
    user.created_at = new Date()
    @users.insert user, cb
  findOrCreate: (twitter, cb) -> 
    @users.find({screen_name: twitter.screen_name}).toArray (err, user) ->
      if err then @add twitter, cb  else cb(null, user)
