define(
    [
        'backbone',
        'views/headerView',
        'views/home/homeView' 
    ],
    
    function(Backbone,HeaderView,HomeView){
        'use strict';    
        var Router = Backbone.Router.extend({
            
            app : {
              view : {}
            },

            routes : {
                '': 'home',
            },

            home : function(){
                console.log('home');
            }
        });

        function initialize(){

            var router = new Router;
            var headerView = new HeaderView({router:this});
            var homeView = new HomeView({router:this});
            headerView.render();
            Backbone.history.start();
        }

        return {initialize:initialize};
      
    }
)