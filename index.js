const linebot = require('linebot');
const express = require('express');

let bot = linebot({
  channelId: '1504696193',
  channelSecret: 'f866d3123893ea89749da78aa08f9844',
  channelAccessToken: 'bv6C//VSNXAOJ19xWX1kf91iq7t5VAMHO4b1PdGYQrF3sUBH2B+XEA8HzbaF7r4WoVPTFYmjOvq4wMiC1ySe+Xi7oBApYTQjsuiis4XvuplrpBQ2mAxvBAiOnuTF4TTKGLOBgtAGxpSnBOEvssfpmQdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
let server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});