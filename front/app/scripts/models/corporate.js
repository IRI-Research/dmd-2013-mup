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
	
     Corporate_model = Backbone.Model.extend({

        initialize: function(){
           //console.log('chargement page corporate')
        },
        
        urlRoot: url_api_dev()+'corporate',
        
        sync: function(method, model, options){  
            options.timeout = 10000;  
            options.contentType = "application/json";
            options.dataType = "jsonp";           
            var that = this;
            options.success = function(resp, status, xhr) {
                corporateData = $.parseJSON(status);
                //console.log(corporateData.path);
                that.set({
                            id:corporateData.id,
                            title:corporateData.values_title,
                            text:corporateData.values_text,
                            image:'http://jobs.dailymotion.com/uploads/home/'+corporateData.path,                  
                })
            }
            options.error = function(model, statut, options){
                $('#view').html("<h1>Imposible de charger la page corporate</h1>");
            }

            Backbone.sync(method, model, options);       
        }
    });
    
    return Corporate_model;
    }
);