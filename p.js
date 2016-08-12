/**
 * Created by deng on 16-8-11.
 */
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var huya = "http://www.jd.com/";
var baidu = "https://www.baidu.com/";
var lc = "http://localhost:3000/hy?topsid=77690206&subsid=2520331682&yyuid=558802298";
var urls=[];
urls.push(huya);
urls.push(baidu);
urls.push(lc);
for(var i=0;i<10;i++){
    var childArgs = [
        path.join(__dirname, 'loadspeed.js'),
        lc+"?"+i
    ];

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        // handle results
    });
}
