
var phantom = require('node-phantom')
  , colors  = require('colors')
  , http = require('http')
  , fs = require('fs')
  , cons = require('consolidate')
  , express = require('express')
  , routes = require('./routes')
  , path = require('path')
;

console.log('#####################################'.green);
console.log('###          SCRIPT START         ###'.green);
console.log('### By Tom FORLINI & Kevin LAROSA ###'.green);
console.log('#####################################'.green);

var app = express();
var server = http.createServer(app);
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

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port : "+app.get('port'));
});

var io = require("socket.io").listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('getUrlClient',function(site){
    site = site.replace(/^https?:\/\//,'') 
    console.log("Open of : "+site.blue);
    phantom.create(function(err, ph) {
      return ph.createPage(function(err, page) {
        return page.open("http://"+site, function(err,status) {
          console.log("Opened site ? "+((status=="success")?status.green:status.red));
          return page.evaluate((function() {
            return document.getElementsByTagName('html')[0].innerHTML;
          }), function(err, result) {
            socket.emit('setUrl',"<html>"+result+"</html>");
            return ph.exit();
          });
        });
      });
    });
  });
});