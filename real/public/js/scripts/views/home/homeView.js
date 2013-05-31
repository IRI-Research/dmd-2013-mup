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
                 $(event.target).parent().remove();
            },

            prevImage : function(e){

                var zonePrev = $(event.target).parent().parent().find('div.prevImage');
                if (e.originalEvent.srcElement.files && e.originalEvent.srcElement.files[0]) {
                    window.save.widget.imagesFile.push(e.originalEvent.srcElement.files[0]);
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
                    lastAudio = window.save.widget.audios.length;
                    // je check si c'est une edition ou un nouveau avec la présente non null de data-audioid
                    var divParent = $(e)[0].target.offsetParent;
                    var id = lastAudio+1;
                    if(divParent.getAttribute("data-audioId") == null){
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