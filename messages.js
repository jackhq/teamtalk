(function() {
  var mongo;
  mongo = require('mongoskin');
  module.exports = {
    init: function(db, collection_name) {
      if (db == null) {
        db = 'localhost:27017/teamtalk';
      }
      if (collection_name == null) {
        collection_name = 'messages';
      }
      this.db = mongo.db(db);
      return this.messages = this.db.collection(collection_name);
    },
    all: function(cb) {
      return this.messages.find().sort({
        created_at: -1
      }).limit(20).toArray(cb);
    },
    add: function(message, cb) {
      message.created_at = new Date();
      return this.messages.insert(message, cb);
    }
  };
}).call(this);
