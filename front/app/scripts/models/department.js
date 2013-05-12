/*     
    Dailymotion Jobs : WebApp v1
    Developer : Kévin La Rosa & Mathieu Dutto
    Designer : Lukas Bachtrog

*/
define(
    [
        'backbone'
    ],
    
    function(Backbone){
	
     Departments_model = Backbone.Model.extend({

        initialize: function(){
           //console.log('Nouveau département')
        },

    });
    
    return Departments_model;
    }
);