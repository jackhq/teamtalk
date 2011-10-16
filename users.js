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
    all: function() {
      return this.users.find().sort({
        created_at: -1
      }).toArray();
    },
    add: function(user, cb) {
      user.created_at = new Date();
      this.users.insert(user, cb);
      return console.log('added twitter user');
    },
    findOrCreate: function(twitter, cb) {
      return this.add(twitter);
    }
  };
}).call(this);
