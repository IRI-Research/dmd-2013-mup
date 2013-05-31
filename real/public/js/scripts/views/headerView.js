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
                'click #save': "save"
               


            },

            template: _.template(headerTemplate),

            sketchpad : {},

            changeSite : function(){
                var url, test;
                var myRegExp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                url = $('#url').val();
                if(myRegExp.test(url)){
                    $.post("http://localhost:3013/getPage", {url:url} )
                        .success(function(data){
                            //$('#website').contents().find('html').html(data);
                            var iframe = $('#website');
                            iframe[0].contentDocument.write(data);
                        })
                        .error(function(error){
                            alert('Erreur pour récupérer la page');
                        });


                }else
                    alert("l'url n'est pas valide");
            },

            editionMode : function(){
                alert('Activation du mode edition');
                $('#widget').hide();
                $('#draw').hide();
            },

            save : function(){

               
                var formdata = new FormData();

                $( "div.audioWidget" ).each(function( index, widgetExtract) {

                    var widgetExtract = $(widgetExtract);
                    var id = widgetExtract[0].getAttribute("data-audioId");
                    var audioWidget = _.find(window.save.widget.audios, function(audio){ return audio.id == id; });
                    audioWidget.position = widgetExtract.css(["top", "left"]);                    console.log(window.save.widget.audios);


                });

                var i;
                var nbAudio = window.save.widget.audios.length;

                for (i=0; nbAudio>i; i++){
                    formdata.append("audiosFile[]", window.save.widget.audios[i].file);
                    var audio = {};
                    audio.position = window.save.widget.audios[i].position;
                    audio.id = window.save.widget.audios[i].id;
                    formdata.append("audios[]", audio);
                }

                /*
                $( "div.imageWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widgetStatut = widgetExtract.find("div.prevImage")[0].children[0].currentSrc;
                    console.log(widgetStatut);
                    save.widget.images.push(widget);
                });
                

                $( "div.linkWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.titre = widgetExtract[0].children[2].innerText;
                    widget.contenu = widgetExtract[0].children[4].innerText;
                    window.save.widget.links.push(widget);
                });

                $( "div.youtubeWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.idYb = widgetExtract[0].children[2].children[1].value;
                    window.save.widget.youtube.push(widget);
                });

                $( "div.textWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.content = widgetExtract[0].children[2].innerText;
                    window.save.widget.textes.push(widget);
                });

                var website = $('#website');
                //save.html = website[0].contentDocument.getElementsByTagName('html')[0];
                //window.save.crayon = this.sketchpad.json();


                // PRÉPARATION DU FORMDATA
                var formdata = new FormData();
                var i = 0, 
                nbAudioFile = window.save.widget.audiosFile.length,
                nbImageFile = window.save.widget.imagesFile.length,
                nbAudio = window.save.widget.audios.length,
                nbImage = window.save.widget.images.length,
                nbLink = window.save.widget.links.length,
                nbYoutube = window.save.widget.youtube.length,
                nbTextes = window.save.widget.textes.length;



                for (i=0; nbAudioFile>i; i++){
                    console.log(window.save.widget.audios[i]);
                    formdata.append("audiosFile[]", window.save.widget.audiosFile[i]);
                }

                for (i=0; nbImageFile>i; i++){
                    formdata.append("imagesFile[]", window.save.widget.imagesFile[i]);
                }

                
                for (i=0; nbAudio>i; i++){
                    formdata.append("audios[]", window.save.widget.audios[i]);
                }
                console.log(formdata);
                /*
                i = 0;
                for (i; nbImageFile>i; i++){
                    formdata.append("imagesFile[]", window.save.widget.images[i]);
                }
                i = 0;
                for (i; nbLink>i; i++){
                    formdata.append("links[]", window.save.widget.links[i]);
                }

                i = 0;
                for (i; nbYoutube>i; i++){
                    formdata.append("youtube[]", window.save.widget.youtube[i]);
                }

                i = 0;
                for (i; nbTextes>i; i++){
                    formdata.append("textes[]", window.save.widget.textes[i]);
                }

                */

  
    
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3013/save",
                    data: formdata,
                    success: function(msg){
                         alert( "Data Saved: " + msg );
                    },
                    error: function(e){
                        console.log(e);
                    },
                    processData: false,
                    contentType: false,
                });

            },


            addTextMode : function(){
                $('#widget').append(_.template(textTemplate));
                $(".textWidget").draggable();
            },


            drawMode : function(){
                this.sketchpad = Raphael.sketchpad("draw", {
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
                this.$el.append(this.template());
                return;
            }
            
        });
        
        return HeaderView;
    }
);