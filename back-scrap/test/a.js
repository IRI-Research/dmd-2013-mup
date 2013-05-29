//Exemple pour PhantomJS 1.2
var page = new WebPage();
var result;
page.open('http://www.allocine.fr/film/cettesemaine.html', function (status) {
    if ('success' !== status) {
        console.log("Error");
    } else {
        result = page.evaluate(function () {
            var titles = $('.titlebar h2 a');
            var out = [];
            titles.each(function () {
                out.push($(this).text());
            });
            return out.join("\n");
        });
        console.log(result);
        phantom.exit();
    }
});
