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
	
     Offer_model = Backbone.Model.extend({

        initialize: function(){
           //console.log('Nouvelle offre')
        },
        
        urlRoot: url_api_dev()+'offer',
        
        sync: function(method, model, options){  
            options.timeout = 10000;  
            options.contentType = "application/json";
            options.dataType = "jsonp";           
            var that = this;
            options.success = function(resp, status, xhr) {
                offerData = $.parseJSON(status);
                //console.log(offerData)
                if(offerData[0].type == 'None'){
                    offerData[0].type = '';
                } else{
                    offerData[0].type = '<span></span> '+offerData[0].type;
                }
                console.log(offerData[0].departement.path3);
                that.set({
                            id:                 offerData[0].id,
                            city:               offerData[0].city.name,
                            country:            offerData[0].city.country,
                            type:               offerData[0].type,
                            department:         offerData[0].departement,
                            idcss:              offerData[0].idcss,
                            path:               offerData[0].departement.path,
                            title:              offerData[0].title,
                            short_desc:         offerData[0].short_desc,
                            assets:             offerData[0].assets,
                            desc:               offerData[0].job_desc,
                            perks:              offerData[0].perks,
                            image:              offerData[0].departement.path3             
                })
            }
            options.error = function(model, statut, options){
                $('.job_info').html("<h1>L'offre n'est pas disponible</h1>");
            }    
            
            Backbone.sync(method, model, options);       
        }
    });
    
    return Offer_model;
    }
);