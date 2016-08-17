/**
 * Created by deng on 16-8-12.
 */
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var cheerio =require('cheerio');
function HY(roomid) {
    this.roomid=roomid;
    this.start()
}
HY.prototype.start=function () {
    var request = require("request");

    var options = { method: 'GET',
        url: 'http://www.huya.com/'+this.roomid
        };
    var hy=this;
    request(options, function (error, response, body) {
        if (error) {
            return console.log(error.message);
        };
        try{
            var rexYyuid = "var l_p = '[0-9]{3,15}";
            var rexSubTop = "http://weblbs.yystatic.com/s/[0-9]{2,15}/[0-9]{2,15}/huyacoop.swf";
            var yyuid = body.match(rexYyuid)[0].substring("var l_p = '".length);
            var match = body.match(rexSubTop)[0];
            var topsid = match.match("s/[0-9]{3,15}")[0].slice(2);
            var subsid = match.match("[0-9]{3,15}/h")[0];
            subsid=subsid.substring(0,subsid.length-2);
            // console.log(body);
            var lc = "http://localhost:3000/hy?topsid=" +topsid+
                "&subsid=" +subsid+
                "&yyuid="+yyuid+"&roomid='"+hy.roomid+"'";
            console.log(lc);
            var childArgs = [
                path.join(__dirname, 'loadspeed.js'),
                lc
            ];

            childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
                // handle results
            });
        }catch (e){
            console.log(e);
        }
       
    });

    
};

module.exports = HY;
