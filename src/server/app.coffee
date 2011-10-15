express = require("express")
app = module.exports = express.createServer()
nowjs = require 'now'
sugar = require 'sugar'
messages = require './messages'
users = require './users'

everyauth = require 'everyauth'

everyauth.twitter
  .consumerKey(process.env.TWITTER_KEY)
  .consumerSecret(process.env.TWITTER_SECRET)
  .findOrCreateUser( (sess, accessToken, accessSecret, twitUser) ->
    #users.findOrCreateUser twitUser.id, (err, user) -> users.add(twitUser) if err
    everyone.now.name = twitUser.screen_name
    twitUser
  )
  .redirectPath('/')

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.cookieParser()
  app.use express.session({secret: 'It is a lovely day for a walk in the park'})
  app.use express.methodOverride()
  app.use everyauth.middleware()
  #app.use express.basicAuth('admin',process.env.KEY) if process.env.KEY?
  app.use app.router
  app.use express.static(__dirname + "/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.get "/", (req, res) ->
  #if everyauth.loggedIn
  #res.cookie 'name', everyauth.twitter.screen_name || 'unknown' 
  #res.cookie 'name', everyauth.twitter.screen_name || 'unknown' 
  
  messages.all (err, messages) ->
    res.render "index", { messages }

everyauth.helpExpress(app)

app.listen process.env.PORT || 3000, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env

messages.init process.env.MONGOHQ_URL ||'localhost:27017/teamtalk' 
users.init process.env.MONGOHQ_URL ||'localhost:27017/teamtalk' 

everyone = nowjs.initialize(app)

everyone.now.distribute = (msg) ->
  messages.add { name: @now.name, msg: msg }
  everyone.now.receive @now.name, msg

