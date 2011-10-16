(function() {
  var app, everyauth, everyone, express, messages, nowjs, sugar, users;
  express = require("express");
  app = module.exports = express.createServer();
  nowjs = require('now');
  sugar = require('sugar');
  messages = require('./messages');
  users = require('./users');
  everyauth = require('everyauth');
  everyauth.twitter.consumerKey(process.env.TWITTER_KEY).consumerSecret(process.env.TWITTER_SECRET).findOrCreateUser(function(sess, accessToken, accessSecret, twitUser) {
    users.findOrCreate(twitUser);
    everyone.now.name = twitUser.screen_name;
    return twitUser;
  }).redirectPath('/');
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'It is a lovely day for a walk in the park'
    }));
    app.use(express.methodOverride());
    app.use(everyauth.middleware());
    app.use(app.router);
    return app.use(express.static(__dirname + "/public"));
  });
  app.configure("development", function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure("production", function() {
    return app.use(express.errorHandler());
  });
  app.get("/", function(req, res) {
    return messages.all(function(err, messages) {
      return users.all(err, allUsers)(function() {
        console.log(allUsers);
        return res.render("index", {
          messages: messages,
          users: allUsers
        });
      });
    });
  });
  everyauth.helpExpress(app);
  app.listen(process.env.PORT || 3000, function() {
    return console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
  messages.init(process.env.MONGOHQ_URL || 'localhost:27017/teamtalk');
  users.init(process.env.MONGOHQ_URL || 'localhost:27017/teamtalk');
  everyone = nowjs.initialize(app);
  everyone.now.distribute = function(msg) {
    messages.add({
      name: this.now.name,
      msg: msg
    });
    return everyone.now.receive(this.now.name, msg);
  };
}).call(this);
