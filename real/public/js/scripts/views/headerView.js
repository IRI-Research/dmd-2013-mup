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
                var nbAudio = window.save.widget.audios.length;
                var nbImage = window.save.widget.images.length;
                var nbLink = window.save.widget.links.length;
                var nbYoutube = window.save.widget.youtube.length;
                var i;

                $( "div.audioWidget" ).each(function( index, widgetExtract) {
                    var widgetExtract = $(widgetExtract);
                    var id = widgetExtract[0].getAttribute("data-audioId");
                    var audioWidget = _.find(window.save.widget.audios, function(audio){ return audio.id == id; });
                    audioWidget.position = widgetExtract.css(["top", "left"]);                   


                });

                for (i=0; nbAudio>i; i++){
                    formdata.append("audiosFile[]", window.save.widget.audios[i].file);
                    var audio = {};
                    audio.position = window.save.widget.audios[i].position;
                    audio.id = window.save.widget.audios[i].id;
                    formdata.append("audios[]", JSON.stringify(audio));
                }

                
                $( "div.imageWidget" ).each(function( index, widgetExtract) {
                    var widgetExtract = $(widgetExtract);
                    var id = widgetExtract[0].getAttribute("data-imageId");
                    var imageWidget = _.find(window.save.widget.images, function(image){ return image.id == id; });
                    imageWidget.position = widgetExtract.css(["top", "left"]);
                });

                for (i=0; nbImage>i; i++){
                    formdata.append("imagesFile[]", window.save.widget.images[i].file);
                    var image = {};
                    image.position = window.save.widget.images[i].position;
                    image.id = window.save.widget.images[i].id;
                    formdata.append("images[]", JSON.stringify(image));
                }
                
                
                $( "div.linkWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.titre = widgetExtract[0].children[2].innerText;
                    widget.url = widgetExtract[0].children[4].innerText;
                    //window.save.widget.links.push(widget);
                    formdata.append("links[]", JSON.stringify(widget));
                });


                $( "div.textWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.content = widgetExtract[0].children[2].innerText;
                    //window.save.widget.textes.push(widget);
                    formdata.append("texts[]", JSON.stringify(widget));
                });

                if(_.isFunction(this.sketchpad.json)){
                   formdata.append("draw", this.sketchpad.json());
                }


               
                $( "div.youtubeWidget" ).each(function( index, widgetExtract) {
                    var widget = {};
                    var widgetExtract = $(widgetExtract);
                    widget.position = widgetExtract.css(["top", "left"]);
                    widget.idYb = widgetExtract[0].children[2].children[1].value;
                    //window.save.widget.youtube.push(widget);
                    formdata.append("youtube[]", JSON.stringify(widget));
                });


                var website = $('#website');
                var content = website[0].contentDocument.getElementsByTagName('html')[0].outerHTML;

                if(content != '<iframe id="website" src="about:blank"></iframe>'){
                    formdata.append("siteHtml[]", content);
                }
  
    
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3013/save",
                    data: formdata,
                    success: function(msg){
                        alert("Votre mup est sauvegarder sous l'id " +msg)
                        window.location = "http://localhost:3013/getpage?id="+msg
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
                if(_.isFunction(this.sketchpad.json)){
                    this.sketchpad.undo();
                }
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