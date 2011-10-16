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
      return console.log('add user');
    },
    findOrCreate: function(twitter, cb) {
      this.add(twitter);
      return this.users.find({
        screen_name: twitter.screen_name
      }, {
        sort: {
          created_at: -1
        }
      }).toArray(function(err, user) {
        if (user) {
          return cb(err, user);
        } else {
          return this.add(twitter, cb);
        }
      });
    }
  };
}).call(this);
