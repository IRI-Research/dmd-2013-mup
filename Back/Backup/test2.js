//Exemple pour PhantomJS 1.2
var page = require('webpage').create();
page.viewportSize = {
    width: 1280,
    height: 800
};
page.open("http://parisjs.org", function (status) {
    if ('success' !== status) {
        console.log("Error");
    } else {
        page.render("parisjs.png");
        phantom.exit();
    }
});