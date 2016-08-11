var url = "http://localhost:3000/hy?";
var webPage = require('webpage');


var page = webPage.create();
page.open(url, function (status) {
    window.setInterval(function () {
        page.render(url+"tutu" + new Date().getTime() +
            ".png");
    }, 10000)
    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('Page title is ' + title);
});
