define(['Router'], function (Router) {
    'use strict';

    var initialize = function(){
		Router.initialize();
		window.save = {
                    "lastId":0,
                    "widget" : {
                        "links" : [],
                        "images" : [],
                        "imagesFile" : [],
                        "youtube" : [],
                        "textes" : [],
                        "audios" : [],
                        "audiosFile" : [],
                    },
                    "crayon":null,
                    "html":null
               
        }
        window.sketchpad = Raphael.sketchpad("draw", {
             editing: true
        });
	}
    
    return {initialize:initialize};

});