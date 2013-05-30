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

                /*

                $( "div.audioWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.file = widgetExtract.find("div.prevAudio")[0].children[0].currentSrc;
                    save.widget.audios.push(widget);
                });

                $( "div.imageWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.file = widgetExtract.find("div.prevImage")[0].children[0].currentSrc;
                    save.widget.images.push(widget);
                });
                
                $( "div.linkWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.titre = widgetExtract[0].children[2].innerText;
                    widget.contenu = widgetExtract[0].children[4].innerText;
                    save.widget.links.push(widget);
                });

                $( "div.youtubeWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.idYb = widgetExtract[0].children[2].children[1].value;
                    save.widget.youtube.push(widget);
                });

                $( "div.textWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.content = widgetExtract[0].children[2].innerText;
                    save.widget.textes.push(widget);
                });

                var website = $('#website');
                //save.html = website[0].contentDocument.getElementsByTagName('html')[0];
                save.crayon = this.sketchpad.json()
                */


                var formdata = new FormData();
                //AUDIO
                var i = 0, nbAudio = window.save.widget.audios.length;
                for (i; nbAudio>i; i++){
                    formdata.append("audios[]", window.save.widget.audios[i]);
                }
                console.log(formdata);
    
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
                //VOIR POUR UTILISER L'AJAX
                /*$.post("http://localhost:3013/save", formdata)
                processData: false,
                contentType: false,
                    .success(function(data){
                        console.log(data)
                    })
                        .error(function(error){
                            alert('Erreur pour récupérer la page');
                });*/
    
                /*
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:3013/save', true);
                xhr.send(formdata);
                xhr.onload = function(e){
                        console.log(e);
                }*/

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