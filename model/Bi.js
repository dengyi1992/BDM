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
        //{"type":"chatmsg","rid":"56040","uid":"5487965","nn":"goooooboom","txt":"手机狗好多啊~手机狗死个吗手机狗好多啊~","cid":"19f3bc2582d340dd25b9890000000000","ic":"avatar/005/48/79/65_avatar","level":"2","egtt":"0","el":"","ctime":1468288446034}
        // console.log(roomid + "::::::" + JSON.stringify(data));
        // {"cmd":"SEND_GIFT","data":{"giftName":"辣条","num":1,"uname":"留戀UN","rcost":205986,"uid":32756779,"top_list":[],"timestamp":1468288335732,"giftId":1,"giftType":0,"action":"喂食","super":0,"price":100,"rnd":"211838876","newMedal":0,"medal":-2,"capsule":[]},"roomid":5215,"ctime":1468288334706}
        //37338::::::{"info":[[0,1,25,16777215,1468288333,569856971,0,"711fd377",0],"应该用源氏先把堡垒切了",[24350193,"300英雄万岁",0,0,0,10000],[4,"恋酱","污喵王恋酱",28892,6606973],[19,256476,6215679],[]],"cmd":"DANMU_MSG","ctime":1468288334899}
        //{"type":"spbc","sn":"焱木丶","dn":"鸽子少女","gn":"火箭","gc":"1","drid":"603630","gs":"6","gb":"1","es":"1","gfid":"59","eid":"7","bgl":"3","rid":"6540","gid":"-9999","bid":"30006_1468288304_121","sid":"3040991","ctime":1468288304522}
        switch (data.cmd){
            case "DANMU_MSG":
                break;
            case "SEND_GIFT":
                break;
            case "WELCOME":
                break;
            default:
                break;
        }
        mydata.push(data);
        if (mydata.length > 100) {
            // console.log(JSON.stringify(mydata));
            upload.uploadSerivce(roomid, "bilibli", mydata);
            mydata = [];
        }
    });
    client.on('connected', function () {
        map.set(roomid,true);
        console.log('connected')
    });
    client.on('login_success', function (data) {
        console.log()
    });
    client.on('close',function () {
        map.set(roomid,false);
    });
    client.connect(roomid);
};