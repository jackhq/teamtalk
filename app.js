(function() {
  var app, everyone, express, messages, nowjs, sugar;
  express = require("express");
  app = module.exports = express.createServer();
  nowjs = require('now');
  sugar = require('sugar');
  messages = require('./messages');
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    if (process.env.KEY != null) {
      app.use(express.basicAuth('admin', process.env.KEY));
    }
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
      return res.render("index", {
        messages: messages
      });
    });
  });
  app.listen(process.env.PORT || 3000, function() {
    return console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
  messages.init(process.env.MONGOHQ_URL || 'localhost:27017/teamtalk');
  everyone = nowjs.initialize(app);
  everyone.now.distribute = function(msg) {
    messages.add({
      name: this.now.name,
      msg: msg
    });
    return everyone.now.receive(this.now.name, msg);
  };
  nowjs.on('disconnect', function() {
    return everyone.nowjs.removeUser('Tom');
  });
}).call(this);
