express = require("express")
app = module.exports = express.createServer()
nowjs = require 'now'
sugar = require 'sugar'
messages = require './messages'
users = require './users'
auth = require 'connect-auth'

protect = (req, res, next) ->
  unless req.isAuthenticated()
    req.authenticate (error, authenticated) ->
      unless error
        if authenticated is true
          next()
        else if authenticated is false
          next new Error("Access Denied!")

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.cookieParser()
  app.use express.session({secret: 'It is a lovely day for a walk in the park'})
  app.use auth([
    auth.Twitter(consumerKey: process.env.TWITTER_KEY, consumerSecret: process.env.TWITTER_SECRET )
    ])
  app.use express.methodOverride()

  app.use app.router
  app.use express.static(__dirname + "/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.get "/", protect, (req, res) ->
  messages.all (err, messages) ->
    res.render "index", { messages }


app.listen process.env.PORT || 3000, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env

messages.init process.env.MONGOHQ_URL || 'localhost:27017/teamtalk' 
users.init process.env.MONGOHQ_URL || 'localhost:27017/teamtalk' 

everyone = nowjs.initialize(app)

everyone.now.distribute = (msg) ->
  messages.add { name: @now.name, msg: msg }
  everyone.now.receive @now.name, msg

