cons = require('consolidate')
phantom = require('node-phantom')
path = require('path')
colors  = require('colors')
phantom = require ('phantom')
mongoose = require('mongoose')
util = require('util')
_ = require('underscore')

#mongoose.connect "mongodb://admin:mupOSEF@kevinlarosa.fr:27017/mup", { db: { safe: true }}, (err) ->
mongoose.connect "mongodb://localhost:27017/mup", { db: { safe: true }}, (err) ->
  console.log "Mongoose - connection error: " + err if err?
  console.log "Mongoose - connection success"




widget = new mongoose.Schema(
    type:String
    position:
        left: String 
        top: String
    file:
        type:String
    id:
        type:String
    url:
        type:String
    idYb:
        type:String
    idWidget:
        type:String
    content:
        type:String
    titre:
        type:String
    url:
        type:String
        default:""
)

data = new mongoose.Schema(
    widget:[widget]
    draw:
        type:String
        default:""
    html:
        type:String
        default:""
)

dataModel = mongoose.model "data", data

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
    # POST /save
    @save = (req, res) ->
        Mup = mongoose.model('data')
        mup = new Mup ({
                widget : []
                draw : null
                html : null
            })
        
        # NB : je dois controler que la clé existe
        #Audio
        listData = _.keys(req.body)
        console.log listData
        if validData('audios',listData)
            if req.body.audios[0][0] == "{"
                widgetAudio = JSON.parse(req.body.audios)
                widgetAudio.type = "audio"
                widgetAudio.file = req.files.audiosFile[0].path
                mup.widget.push(widgetAudio) 
            else
                for i in req.body.audios[0]
                    widgetAudio = JSON.parse(req.body.audios[0][_i])
                    widgetAudio.type = "audio"
                    widgetAudio.file = req.files.audiosFile[0][_i].path
                    console.log(widgetAudio)
                    mup.widget.push(widgetAudio)

        #Images
        if validData('images',listData)
            if req.body.images[0][0] == "{"
                widgetImages = JSON.parse(req.body.images)
                widgetImages.type = "image"
                widgetImages.file = req.files.imagesFile[0].path
                mup.widget.push( widgetImages)
            else
                for j in req.body.images[0]
                    widgetImage = JSON.parse(req.body.images[0][_j])
                    widgetImage.type = "image"
                    widgetImage.file = req.files.imagesFile[0][_j].path
                    console.log widgetImage
                    mup.widget.push(widgetImage)

        #Youtube
        if validData('youtube',listData)
            if req.body.youtube[0][0] == "{"
                widgetYoutube = JSON.parse(req.body.youtube)
                widgetYoutube.type = "youtube"
                mup.widget.push(widgetYoutube)
            else
                for k in req.body.youtube[0]
                    widgetYoutube = JSON.parse(req.body.youtube[0][_k])
                    widgetYoutube.type = "youtube"
                    mup.widget.push(widgetYoutube)

        #texts
        if validData('texts',listData)
            if req.body.texts[0][0] == "{"
                widgetTexts = JSON.parse(req.body.texts)
                widgetTexts.type = "texts"
                mup.widget.push(widgetTexts)
            else
                for l in req.body.texts[0]
                    widgetTexts = JSON.parse(req.body.texts[0][_l])
                    widgetTexts.type = "texts"
                    mup.widget.push(widgetTexts)

        #links
        if validData('links',listData)
            if req.body.links[0][0] == "{"
                widgetLinks = JSON.parse(req.body.links)
                widgetLinks.type = "links"
                mup.widget.push(widgetLinks)
            else
                for m in req.body.links[0]
                    widgetLinks = JSON.parse(req.body.links[0][_m])
                    widgetLinks.type = "links"
                    #widgetLinks.position.top = "links"
                    #widgetLinks.position.left = "links"
                    mup.widget.push(widgetLinks)
                    console.log mup
                    
        #Draw
        if validData('draw',listData)
            #mup.widget.push(draw:JSON.parse(req.body.draw))
            mup.draw = req.body.draw

        if validData('siteHtml',listData)
            mup.html = req.body.siteHtml[0]

         mup.save (err, resource) ->
            console.log "Problème de sauvegade dans mongo: " + err if err?
            res.send(201,mup._id)

        console.log mup

    # GET getpage /getpage?id=
    @getMup = (req, res) ->
        id = req.query.id
        if typeof(id) != "undefined"
            query = dataModel.find(null);
            query.find(
                _id : id
            )
            query.exec((err, data)->
                if (err) 
                    throw err; 
                res.send(data);
            )
        else
           res.send(404,"ID NOT FOUND")





