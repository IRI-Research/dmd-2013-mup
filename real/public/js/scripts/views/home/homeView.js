define(
    [
        'backbone',
        'vendor/BaseView'
    ],
    
    function(Backbone,BaseView){
        'use strict';  
        var Home = BaseView.extend({
            
            initialize: function(){
                
            },
            
            el: '#container',
            
            events: {
                'click .closeWidget' : 'closeWidget',
                'change input.imageUpload' : "prevImage",
                'click .btnLinkYoutube' : 'changeLinkYoutube',
                'change input.audioUpload' : "prevAudio"
            },
            
            render: function(){
                console.log('je render la home');
                return this;
            },

            closeWidget : function(e){

                var widget = $(event.target)[0].offsetParent;
                console.log(widget.classList[0]);
                var type = widget.classList[0];
                switch (type) 
                { 
                    case "audioWidget": 
                        console.log("audio");
                        var id = widget.getAttribute("data-audioId");
                        if(id != null){
                            alert(id);
                            var audioWidget = _.reject(window.save.widget.audios, function(audio){ return audio.id == id; });
                            window.save.widget.audios = audioWidget;
                        }
                    break; 
                    case "imageWidget": 
                        console.log("image");
                        var id = widget.getAttribute("data-imageId");
                        if(id != null){
                            var imageWidget = _.reject(window.save.widget.images, function(image){ return image.id == id; });
                            window.save.widget.images = imageWidget;
                        }
                    break; 
                    /*case "linkWidget": 
                        console.log("link");
                    break; 
                    case "youtubeWidget": 
                        console.log("youtube");
                    break; 
                    case "textWidget": 
                        console.log("text");
                    break;*/
                }
                 
                $(event.target).parent().remove();
            },

            prevImage : function(e){

                var zonePrev = $(event.target).parent().parent().find('div.prevImage');
                if (e.originalEvent.srcElement.files && e.originalEvent.srcElement.files[0]) {
                    //je cherche le dernier fichier images pre-save
                    var divParent = $(e)[0].target.offsetParent;
                    if(divParent.getAttribute("data-imageId") == null){
                        window.save.lastId = parseInt(window.save.lastId)+1;
                        var id = window.save.lastId;
                        divParent.setAttribute('data-imageId',id);
                        var widgetImage = {
                            id : id,
                            file : e.originalEvent.srcElement.files[0],
                        }
                        window.save.widget.images.push(widgetImage);
                    }else{
                        var imageId = zonePrev[0].parentNode.getAttribute("data-imageId");
                        var imageWidget = _.find(window.save.widget.images, function(image){ return image.id == imageId; });
                        imageWidget.file = e.originalEvent.srcElement.files[0];
                    }
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //$('#blah').attr('src', e.target.result);
                        zonePrev.html('<img src="'+e.target.result+'"/>');
                        zonePrev.find('img').resizable();
                    }
                    reader.readAsDataURL(e.originalEvent.srcElement.files[0]);
                }
            },

            changeLinkYoutube : function(){

                    var zoneYoutube = $(event.target).parent().parent().find('div.youtube');
                    var idYoutube = $(event.target).parent().find('input').val();
                    zoneYoutube.find('iframe').remove();
                    zoneYoutube.append('<iframe width="560" height="315" src="http://www.youtube.com/embed/'+idYoutube+'" frameborder="0" allowfullscreen></iframe>');
            },

            // FAIRE DE MEME POUR PREV IMAGE AND CI
            prevAudio: function(e){
                var zonePrev = $(event.target).parent().parent().find('div.prevAudio');
                var lastAudio;
                zonePrev.find('audio').remove();
                if (e.originalEvent.srcElement.files && e.originalEvent.srcElement.files[0]) {
                    //je cherche le dernier fichier audio pre-save
                    // je check si c'est une edition ou un nouveau avec la présente non null de data-audioid
                    var divParent = $(e)[0].target.offsetParent;
                    if(divParent.getAttribute("data-audioId") == null){
                        window.save.lastId = parseInt(window.save.lastId)+1;
                        var id = window.save.lastId;
                        divParent.setAttribute('data-audioId',id);
                        //window.save.widget.audiosFile.push(e.originalEvent.srcElement.files[0]);
                        var widgetAudio = {
                            id : id,
                            file : e.originalEvent.srcElement.files[0],
                        }
                        window.save.widget.audios.push(widgetAudio);
                    }else{
                        //
                        var audioId = zonePrev[0].parentNode.getAttribute("data-audioId");
                        var audioWidget = _.find(window.save.widget.audios, function(audio){ return audio.id == audioId; });
                        audioWidget.file = e.originalEvent.srcElement.files[0];
                    }
                    
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //$('#blah').attr('src', e.target.result);
                        var html = "<audio controls>";
                                html +="<source src='"+e.target.result+"' type='audio/mp3'>";
                            html += "</audio>";
                        zonePrev.append(html);
                    }
                    reader.readAsDataURL(e.originalEvent.srcElement.files[0]);
                }

            }
        });
        
        return Home;
    }
);