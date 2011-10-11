(function() {
  var app, express;
  express = require("express");
  app = module.exports = express.createServer();
  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
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
  app.get("/", function(req, res) {
    return res.render("index", {
      messages: [
        {
          message: 'Hello World',
          author: 'tom@jackhq.com',
          posted: '30 min ago'
        }, {
          message: 'Hello World2',
          author: 'barrett@jackhq.com',
          posted: '60 min ago'
        }
      ]
    });
  });
  app.listen(process.env.PORT || 3000, function() {
    return console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
}).call(this);
