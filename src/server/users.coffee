mongo = require 'mongoskin'

module.exports =
  init: (db = 'localhost:27017/teamtalk', collection_name = 'users') ->
    @db = mongo.db(db)
    @users = @db.collection(collection_name)
  all: (cb) ->
    @users.find().sort({created_at: -1}).toArray cb
  add: (user, cb) ->
    user.created_at = new Date()
    @user.insert message, cb
  findById: (id, cb) -> @users.findById id, cb
