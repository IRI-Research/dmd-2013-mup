# Modules
express = require 'express'
http = require 'http'
partials = require 'express-partials'
app = express()
cons = require('consolidate')
path = require('path')
colors  = require('colors')

# Boot setup
require("#{__dirname}/../config/boot")(app)

console.log('#####################################'.green);
console.log('###          SCRIPT START         ###'.green);
console.log('### By Tom FORLINI & K.LA ROSA    ###'.green);
console.log('#####################################'.green);

# Configuration
app.configure ->
  port = process.env.PORT || 3013
  if process.argv.indexOf('-p') >= 0
    port = process.argv[process.argv.indexOf('-p') + 1]

  app.set 'port', port
  app.set 'views', "#{__dirname}/views"
  app.engine('html', cons.mustache);
  app.set('view engine', 'html');
  app.use express.static("#{__dirname}/../public")
  app.use express.favicon()
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use partials()
  app.use require('connect-assets')(src: "#{__dirname}/assets")
  app.use app.router

app.configure 'development', ->
  app.use express.errorHandler()

# Routes
require("#{__dirname}/routes")(app)

# Server
http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'} in #{app.settings.env} mode"
