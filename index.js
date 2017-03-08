const linebot = require('linebot');
const express = require('express');
const getJSON = require('get-json');
var timer;
var pm = [];
let bot = linebot({
  channelId: '1504696193',
  channelSecret: 'f866d3123893ea89749da78aa08f9844',
  channelAccessToken: 'bv6C//VSNXAOJ19xWX1kf91iq7t5VAMHO4b1PdGYQrF3sUBH2B+XEA8HzbaF7r4WoVPTFYmjOvq4wMiC1ySe+Xi7oBApYTQjsuiis4XvuplrpBQ2mAxvBAiOnuTF4TTKGLOBgtAGxpSnBOEvssfpmQdB04t89/1O/w1cDnyilFU='
});



// bot.on('message', function(event) {
//   console.log(event); //把收到訊息的 event 印出來看看
// });

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
_getJSON();

_bot();
function _bot() {
  bot.on('message', function(event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';
      if (msg.indexOf('PM2.5')||msg.indexOf('pm2.5') != -1) {
        pm.forEach(function(e, i) {
          if (msg.indexOf(e[0]) != -1) {
            replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
          }
        });
        if (replyMsg == '') {
          replyMsg = '請輸入正確的地點';
        }
      } 
      if(msg.indexOf('Tommy') != -1){
        replyMsg = 'Tommy哥天才!';
      }
      if (replyMsg == '') {
        replyMsg = '不知道「'+msg+'」是什麼意思 :p';
      }

      event.reply(replyMsg).then(function(data) {
        console.log(replyMsg);
      }).catch(function(error) {
        console.log('error');
      });
    }
  });

}

function _getJSON() {
  clearTimeout(timer);
  getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
    response.forEach(function(e, i) {
      pm[i] = [];
      pm[i][0] = e.SiteName;
      pm[i][1] = e['PM2.5'] * 1;
      pm[i][2] = e.PM10 * 1;
    });
  });
  timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
}