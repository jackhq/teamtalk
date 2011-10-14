everyauth = require 'everyauth'

everyauth.twitter
  .consumerKey('JcbKXJSIqPZWLDYG0cMJQ')
  .consumerSecret('tkrY0csk5kVbqpPq7riGwOCPrtGC2FNP7RuIPlo')
  .redirectPath('/')
  .findOrCreateUser( (session, accessToken, accessTokenSecret, twitterUserMetadata) ->
    
  )
  
express = require("express")
app = module.exports = express.createServer()
nowjs = require 'now'
sugar = require 'sugar'
messages = require './messages'

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

everyauth.helpExpress(app)

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.get "/", (req, res) ->
  messages.all (err, messages) ->
    res.render "index", { messages }
  
app.listen process.env.PORT || 3000, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env

messages.init process.env.MONGOHQ_URL ||'localhost:27017/teamtalk' 

everyone = nowjs.initialize(app)

everyone.now.distribute = (msg) ->
  messages.add { name: @now.name, msg: msg }
  everyone.now.receive @now.name, msg

