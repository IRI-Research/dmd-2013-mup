define(['Router'], function (Router) {
    'use strict';

    var initialize = function(){
		Router.initialize();
		window.save = {
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
	}
    
    return {initialize:initialize};

});