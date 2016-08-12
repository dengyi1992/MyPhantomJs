/**
 * Created by deng on 16-8-11.
 */
var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status) {
    // window.setInterval(function () {
    //     page.render("tutu"+ new Date().getTime() +
    //         ".png");
    // }, 10000);
    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('Page title is ' + title);
});