var phantom=require('node-phantom');
var fs = require('fs');
var _ =require('underscore');
var url = require('url');
var http = require('http');
var request = require('request');

phantom.create(function(err,ph) {
  return ph.createPage(function(err,page) {
    return page.open("http://hetic.net", function(err,status) {
      console.log("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
        //jQuery Loaded.
        //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
        setTimeout(function() {
          return page.evaluate(function() {
            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
            var h2Arr = [],
            pArr = [],
            imgArr = [],
            html = null;
            html = $('html').html();

            $('img').each(function() {
                imgArr.push($(this).attr('src'));
            });

            return {
              html: html,
              imgArr: imgArr
            };
          }, function(err,result) {
            fs.writeFile("site/hetic.html", '<html>'+result.html+'</html>', 'utf8',function(){
            	console.dir(result.imgArr);
            	/*_.each(result.imgArr,function(image){
            		console.log(image);
            	    //fs.writeFile("site/lala.jpg",'http://hetic.net/sites/all/themes/hetic/images/wsf-logo.jpg','binary');
            		console.log(image);
            	})*/
            	download('http://hetic.net/sites/all/themes/hetic/images/wsf-logo.jpg', 'google.png');
            	ph.exit();
            })
          });
        }, 5000);
      });
    });
  });
});


var download = function(uri, filename){
	options = {
	    host: 'http://hetic.net/'
	  , port: 80
	  , path: '/sites/all/themes/hetic/images/wsf-logo.jpg'
	}
	console.log(uri);
	console.log(filename);
	
	var file = fs.createWriteStream(filename);
	console.log(file);
	
	var request = http.get('http://www.hetic.net/sites/all/themes/hetic/images/wsf-logo.jpg', function(res) {
	var imagedata = ''
	    res.setEncoding('binary')
	    console.dir(res);

	    res.on('data', function(chunk){
	        imagedata += chunk
	        console.log(imagedata);
	    })

	    console.log(imagedata)

	    res.on('end', function(){
	        fs.writeFile('site/logo.png', imagedata, 'binary', function(err){
	            if (err) throw err
	            console.log('File saved.')
	        })
	    })
	});
};