express = require("express")
app = module.exports = express.createServer()
nowjs = require 'now'
sugar = require 'sugar'
messages = require './messages'

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
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

app.get "/", (req, res) ->
  messages.all (err, messages) ->
    res.render "index", { messages }
  
app.listen process.env.PORT || 3000, ->
  messages.init process.env.MONGOHQ_URL ||'localhost:27017/teamtalk' 
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env

everyone = nowjs.initialize(app)

everyone.now.distribute = (msg) ->
  messages.add { name: @now.name, msg: msg }
  everyone.now.receive @now.name, msg