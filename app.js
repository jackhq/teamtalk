(function() {
  var app, auth, everyone, express, messages, nowjs, protect, sugar, users;
  express = require("express");
  app = module.exports = express.createServer();
  nowjs = require('now');
  sugar = require('sugar');
  messages = require('./messages');
  users = require('./users');
  auth = require('connect-auth');
  users = [];
  protect = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return req.authenticate(function(error, authenticated) {
        if (!error) {
          if (authenticated === true) {
            console.log(authenticated);
            return next();
          } else if (authenticated === false) {
            return res.end("Access Denied!");
          }
        }
      });
    } else {
      return next();
    }
  };
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'It is a lovely day for a walk in the park'
    }));
    app.use(auth([
      auth.Twitter({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET
      })
    ]));
    app.use(express.methodOverride());
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
  app.get("/", protect, function(req, res) {
    return messages.all(function(err, messages) {
      return res.render("index", {
        users: users,
        messages: messages,
        nick: req.getAuthDetails().user.username
      });
    });
  });
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
  everyone.now.addUser = function(name) {
    return users.push(name);
  };
  everyone.now.users = function() {
    return users;
  };
}).call(this);
