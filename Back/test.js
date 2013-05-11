var page = require('webpage').create();
page.open('http://atinux.fr', function (status) {
    page.includeJs('http://code.jquery.com/jquery.js', function () {
        var titles = page.evaluate(function() {
            return $('.entry-title a').map(function () {
                return $(this).html();
            }).get();
        });
        console.log(titles.join('\n'));
        phantom.exit();
    });
});