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
                console.log(e.originalEvent.srcElement.files);
                var zonePrev = $(event.target).parent().parent().find('div.prevImage');
                zonePrev.find('img').remove();
                if (e.originalEvent.srcElement.files && e.originalEvent.srcElement.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e);
                        //$('#blah').attr('src', e.target.result);
                        zonePrev.append('<img src="'+e.target.result+'"/>');
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

            prevAudio: function(e){

                console.log(e.originalEvent.srcElement.files);
                var zonePrev = $(event.target).parent().parent().find('div.prevAudio');
                zonePrev.find('audio').remove();
                if (e.originalEvent.srcElement.files && e.originalEvent.srcElement.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e);
                        //$('#blah').attr('src', e.target.result);
                        var html = "<audio controls>";
                                html +="<source src='"+e.target.result+"' type='audio/mp3'>";
                            html += "</audio>";
                        console.log(html);
                        zonePrev.append(html);
                    }
                    reader.readAsDataURL(e.originalEvent.srcElement.files[0]);
                }

            }
        });
        
        return Home;
    }
);