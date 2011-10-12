mongo = require 'mongoskin'

module.exports =
  init: (db = 'localhost:27017/teamtalk', collection_name = 'messages') ->
    @db = mongo.db(db)
    @messages = @db.collection(collection_name)
  all: (cb) ->
    @messages.find().sort({created_at: -1}).limit(20).toArray cb
  add: (message, cb) ->
    message.created_at = new Date()
    @messages.insert message, cb
