/**
 * Created by deng on 16-7-11.
 */
var Client = require('./comment_socket');
var upload = require("./upload.js");

exports.Bi = function (roomid) {
    var client = new Client();
    var mydata = [];
    console.log(roomid);
    client.on('newCommentString', function (data) {
        data.ctime = new Date().getTime();
        console.log(roomid + "::::::" + JSON.stringify(data));

        mydata.push(data);
        if (mydata.length > 20) {
            upload.uploadSerivce(roomid, "bilibli", mydata);
            mydata = [];
        }
    });
    client.on('connected', function () {
        console.log('connected')
    });
    client.on('login_success', function (data) {
        console.log()
    });
    client.connect(roomid);
};