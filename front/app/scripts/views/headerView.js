define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/header.html',
        'text!templates/widgets/link.html',
        'text!templates/widgets/image.html',
        'text!templates/widgets/youtube.html',
        'text!templates/widgets/audio.html',
        'text!templates/widgets/text.html'
    ],
    
    function(Backbone,BaseView,headerTemplate,linkTemplate,imageTemplate,youtubeTemplate,audioTemplate,textTemplate,Paper){
        'use strict'; 
        var HeaderView = BaseView.extend({
            
            initialize: function(){
                //console.log(navigator.language);
            },
            
            el:"#header",

            events : {
                'click #sendUrl' : 'changeSite',
                'click #editBtn' : 'editionMode',
                'click #textBtn' : 'addTextMode',
                'click #crayonBtn' : 'drawMode',
                'click #gommeBtn' : 'effacerMode',
                'click #audioBtn' : 'addAudio',
                'click #ytBtn' : 'addVideo',
                'click #imgBtn' : 'addPicture',
                'click #linkBtn' : 'addLink',
               


            },

            template: _.template(headerTemplate),


            changeSite : function(){

                url = $('#url').val();
                console.log(url);

            },

            editionMode : function(){
                alert('Activation du mode edition');
            },


            addTextMode : function(){
                $('#widget').append(_.template(textTemplate));
                $(".textWidget").draggable();
            },


            drawMode : function(){
                var sketchpad = Raphael.sketchpad("draw", {
                    editing: true
                });

                $('#widget').hide();
               
            },


            effacerMode : function(){
                alert('efface du dessin');
            },


            addAudio : function(){
                $('#widget').show();
                $('#widget').append(_.template(audioTemplate));
                $(".audioWidget").draggable();
            },


            addVideo : function(){
                $('#widget').show();
                $('#widget').append(_.template(youtubeTemplate));
                $(".youtubeWidget").draggable();
            },


            addPicture : function(){
                $('#widget').show();
                $('#widget').append(_.template(imageTemplate));
                $( ".imageWidget").draggable();
            },


            addLink : function(){
                 $('#widget').show();
                 $('#widget').append(_.template(linkTemplate));
                 $( ".linkWidget" ).draggable();
                 
            },
            
            render: function(){
                console.log('lol');
                this.$el.append(this.template());
                return;
            }
            
        });
        
        return HeaderView;
    }
);