define(
    [
        'backbone',
        'views/headerView',
        'views/home/homeView',
        'views/mup/mupView' 
    ],
    
    function(Backbone,HeaderView,HomeView,MupView){
        'use strict';    
        var Router = Backbone.Router.extend({
            
            app : {
              view : {}
            },

            routes : {
                '': 'home',
                'getMup/:id' : "getMup"
            },

            home : function(){
                $('#website').empty();
                $('#draw').empty();
                $('#widget').empty();
            },

            getMup : function(id){
                var mupView = new MupView({router:this,param:id});
                mupView.render();
            }

        });

        function initialize(){

            var router = new Router;
            var headerView = new HeaderView({router:router});
            var homeView = new HomeView({router:router});
            headerView.render();
            Backbone.history.start();
        }

        return {initialize:initialize};
      
    }
)