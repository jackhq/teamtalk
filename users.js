(function() {
  var mongo;
  mongo = require('mongoskin');
  module.exports = {
    init: function(db, collection_name) {
      if (db == null) {
        db = 'localhost:27017/teamtalk';
      }
      if (collection_name == null) {
        collection_name = 'users';
      }
      this.db = mongo.db(db);
      return this.users = this.db.collection(collection_name);
    },
    all: function(cb) {
      return this.users.find().sort({
        created_at: -1
      }).toArray(cb);
    },
    add: function(user, cb) {
      user.created_at = new Date();
      return this.user.insert(message, cb);
    }
  };
}).call(this);
