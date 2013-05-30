define(['Router'], function (Router) {
    'use strict';

    var initialize = function(){
		Router.initialize();
		window.save = {
                    "widget" : {
                        "links" : [],
                        "images" : [],
                        "youtube" : [],
                        "textes" : [],
                        "audios" : [],
                    },
                    "crayon":null,
                    "html":null
               
        }
	}
    
    return {initialize:initialize};

});