
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , cons = require('consolidate')
  , _ = require('underscore')
  , cp = require('child_process')
  , phantom = require('node-phantom')
  , moment  = require('moment')
  , mongoose = require('mongoose')
  
;

getTimeStampDay = function(){
    return moment().startOf('day').format('X')+'000';
}

mongoose.connect('mongodb://hetic:hetic83@kevinlarosa.fr:27017/iri', function(err) {
  if (err) { throw err; }
});

//Schéma de ma collection Mongo || si elle n'existe pas elle se génére
var siteSchema = new mongoose.Schema({
  url : { type : String },
  date : { type: Date, default: getTimeStampDay()}
});

// Crée un lien vers ma collections a travers le schéma définis en haut
var sitesModel = mongoose.model('sites',siteSchema);



//Crée un nouvelle enregistrement
/*var siteAdd = new sitesModel({ url : 'http://mathieudutto.fr'});

// persiste
siteAdd.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
  
  var query = sitesModel.find(null);
    query.where('url','http://mathieudutto.fr');
    query.exec(function (err, comms) {
        console.log(comms);
    })
});*/

/*
 1- Comprendre comment ajouter un timestamp dans le bson
 
 * */

var app = express();
var server = http.createServer(app);
var listUser = [];
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var path = 'public';

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require("socket.io").listen(server)


io.sockets.on('connection', function (socket) {
	//Ajoute l'utilisateur
	listUser.push(socket.id);
	//Envoie l'identifiant côté client
  	socket.emit('initialize', socket.id );
  	//change l'url a tous les users
  	socket.on('getUrlClient',function(url){
  	    url = url.replace(/^https?:\/\//,'') 
  	   sitesModel.findOne({ 'url': 'http://'+url, 'date':getTimeStampDay()},function (err, site) {
  	         if (err) return handleError(err);
  	         if(site != null){
  	            console.log("je recupère l'image existante");
  	            url = site.url.replace(/^https?:\/\//,'') 
  	            socket.emit('setUrl','/site/'+getTimeStampDay()+'/'+site._id+'.png');    
  	         }else{
                   phantom.create(function(err,ph) {
                       return ph.createPage(function(err,page) {
                               return page.open('http://'+url, function(err,status) {
                                   console.log("photo!");
                                   siteAdd = new sitesModel({ url : 'http://'+url});
                                   siteAdd.save(function (err,site) {
                                   if (err) { throw err; }
                                   console.log(site._id)
                                       page.render(path+'/site/'+getTimeStampDay()+'/'+site._id+'.png',function(){
                                               console.log("insertion dans mongo de "+url);
                                               socket.emit('setUrl','/site/'+getTimeStampDay()+'/'+site._id+'.png');
                                       });                                   
                                   });
                               });          
                       });
                   });
             }
       });	             
  	})
});