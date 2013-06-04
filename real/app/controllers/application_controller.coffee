cons = require('consolidate')
phantom = require('node-phantom')
path = require('path')
colors  = require('colors')
phantom = require ('phantom')
mongoose = require('mongoose')
util = require('util')
_ = require('underscore')

mongoose.connect "mongodb://admin:mupOSEF@kevinlarosa.fr:27017/mup", { db: { safe: true }}, (err) ->
  console.log "Mongoose - connection error: " + err if err?
  console.log "Mongoose - connection success"



data = new mongoose.Schema(
    widget:[
        type:String
        position:Array
        file:
            type:String
            default:""
        url:
            type:String
            default:""
    ]
)

mongoose.model "data", data

#Permet de voir si ce widget est envoyé en analysant les name key
validData = (data,listData)->
    for i in listData
        if(listData[_i] == data)
            return true          
    return false 


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
        Mup = mongoose.model('data')
        mup = new Mup ({
                widget : []
            })
        
        # je dois controler que la clé existe
        #Audio
        listData = _.keys(req.body)
        if validData('audios',listData)
            if req.body.audios[0][0] == "{"
                widgetAudio = JSON.parse(req.body.audios)
                widgetAudio.type = "audio"
                widgetAudio.file = req.files.audiosFile.path
                mup.widget.push(widgetAudio) 
            else
                for i in req.body.audios[0]
                    widgetAudio = JSON.parse(req.body.audios[0][_i])
                    widgetAudio.type = "audio"
                    widgetAudio.file = req.files.audiosFile[0][_i].path
                    mup.widget.push(widgetAudio)

        # Images
        ###
        console.log req.body.images[0][0]
        if req.body.images[0][0] == "{"
            widgetImages = JSON.parse(req.body.audios)
            widgetImages.type = "image"
            widgetImages.file = req.files.imagesFile.path
            mup.widget.push(widgetAudio) 
        else
            console.log ('plusieur images')
            for i in req.body.images[0]
                console.log "ici"
                console.log req.body.images
                widgetImage = JSON.parse(req.body.images[0][_i])
                widgetImage.type = "image"
                widgetImage.file = req.files.imagesFile[0][_i].path
                mup.widget.push(widgetImage)
        ###
        console.log mup



