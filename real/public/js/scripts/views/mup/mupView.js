define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/widgets/link.html',
        'text!templates/widgets/image.html',
        'text!templates/widgets/youtube.html',
        'text!templates/widgets/audio.html',
        'text!templates/widgets/text.html'
    ],
    
    function(Backbone,BaseView,linkTemplate,imageTemplate,youtubeTemplate,audioTemplate,textTemplate){
        'use strict';  
        var MupView = BaseView.extend({
            
            initialize: function(){
                console.log("je charge le mup")
            },
            
            el: '#container',
            
            events: {

            },
            
            render: function(){
                //je clean les views
                $('#website').empty();
                $('#draw').empty();
                $('#widget').empty();
                $.get("http://localhost:3013/getMup?id="+this.param)
                .success(function(data){
                    //IFRAME
                    var iframe = $('#website');
                    iframe[0].contentDocument.write(data[0].html);
                    //DRAW
                    window.sketchpad.json(data[0].draw);
                    //Widget
                    var _i = 0, widgetNumber = data[0].widget.length;
                    for(_i; _i<widgetNumber;_i++){
                        //console.log(data[0].widget[_i]);
                        switch (data[0].widget[_i].type)
                        {
                            case "links":
                                var widget = $(linkTemplate);
                                widget.find('button.closeWidget').remove();
                                widget.html('<a href="'+data[0].widget[_i].url+'">'+data[0].widget[_i].titre+'</a>');
                                widget.css('top',data[0].widget[_i].position.top);
                                widget.css('left',data[0].widget[_i].position.left);
                                $('#widget').append(widget);
                            break;

                            case "image":
                                var nbPath = data[0].widget[_i].file.length;
                                var url = data[0].widget[_i].file.substr(7,nbPath);
                                var widget = $(imageTemplate);
                                widget.css('top',data[0].widget[_i].position.top);
                                widget.css('left',data[0].widget[_i].position.left);
                                var zonePrev = widget.find('div.prevImage');
                                zonePrev.html('<img src="'+url+'"/>');
                                //suppression des élements de saisi
                                widget.find('button.closeWidget').remove();
                                widget.find('div')[0].remove();
                                $('#widget').append(widget);
                            break;

                            case "audio":
                                var nbPath = data[0].widget[_i].file.length;
                                var url = data[0].widget[_i].file.substr(7,nbPath);
                                var widget = $(audioTemplate);
                                widget.css('top',data[0].widget[_i].position.top);
                                widget.css('left',data[0].widget[_i].position.left);
                                var zonePrev = widget.find('div.prevAudio');
                                var html = "<audio controls>";
                                html +="<source src='"+url+"' type='audio/mp3'>";
                                html += "</audio>";
                                zonePrev.html(html);
                                //suppression des élements de saisi
                                widget.find('button.closeWidget').remove();
                                widget.find('div')[0].remove();
                                $('#widget').append(widget);
                            break;

                            case "youtube":
                                var widget = $(youtubeTemplate);
                                console.log(data[0].widget[_i]);
                                widget.css('top',data[0].widget[_i].position.top);
                                widget.css('left',data[0].widget[_i].position.left);
                                widget.find('button.closeWidget').remove();
                                widget.find('div')[0].remove();
                                var zonePrev = widget.find('div.prevImage');
                                widget.append('<iframe width="560" height="315" src="http://www.youtube.com/embed/'+data[0].widget[_i].idYb+'" frameborder="0" allowfullscreen></iframe>');
                                $('#widget').append(widget);


                            break;

                            case "texts":
                                var widget = $(textTemplate);
                                widget.find('button.closeWidget').remove();
                                widget.css('top',data[0].widget[_i].position.top);
                                widget.css('left',data[0].widget[_i].position.left);
                                widget.find('p').remove();
                                widget.text(data[0].widget[_i].content);
                                $('#widget').append(widget);

                            break;
                        }

                    }




                 })
                .error(function(error){navigator.notification.alert(error.responseText, null, "Notification")});
            }


        });
        
        return MupView;
    }
);