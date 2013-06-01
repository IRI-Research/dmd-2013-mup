cons = require('consolidate')
phantom = require('node-phantom')
path = require('path')
colors  = require('colors')
phantom = require ('phantom')
mongoose = require('mongoose')
util = require('util')

module.exports = (app) ->
  class app.ApplicationController

    # GET /
    @index = (req, res) ->
        viewdata = { 'test' : 'Hey now.'};
        res.render 'index',viewdata

    # POST /getPage
    @getPage = (req, res) ->
        url = req.body.url
        console.log "Open of : " + url
        phantom.create (ph) ->
            ph.createPage (page) ->
                page.open url, (status) ->
                    console.log "opened "+url, status
                    page.evaluate (->  document.getElementsByTagName("html")[0].innerHTML), (result) ->
                        res.json(result)
                        ph.exit()
    # POST /getPage
    @save = (req, res) ->
        console.log(req.body);
        console.log(req.files);

       