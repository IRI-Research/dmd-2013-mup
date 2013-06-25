module.exports = (app) ->
  # Index
  app.get '/', app.ApplicationController.index
  
  app.post '/getPage', app.ApplicationController.getPage

  app.post '/save', app.ApplicationController.save

  app.get '/getMup', app.ApplicationController.getMup

  # Error handling (No previous route found. Assuming it’s a 404)
  app.get '/*', (req, res) ->
    NotFound res

  NotFound = (res) ->
    res.render '404', status: 404, view: 'four-o-four'
