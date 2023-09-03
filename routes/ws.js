const WebSocket = require('ws')
const uuidv4 = require('uuid').v4

const wss1 = new WebSocket.WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws) {
  ws.on('error', console.error);
  console.log('連線成功');
  const uuid = uuidv4()

  ws.uuid = uuid; // 判斷是哪一個用戶使用
  
  // 發出第一個訊息給用戶，表示用戶是誰
  const user = {
    context: 'user',
    uuid
  }
  // 發訊息給用戶
  ws.send(JSON.stringify(user)) // 只能發送字串

  // 監聽
  ws.on('message', (message) => {
    const msg = JSON.parse(message)

    const newMessage = {
      context: 'message',
      uuid,
      content: msg.content
    }

    // 直接回傳
    // ws.send(JSON.stringify(newMessage))
    sendAllUser(newMessage);
  })
});

// 推播
function sendAllUser(msg) {
  wss1.clients.forEach(function (client) {
    // 已建立連線：並且排除自身
    if (client.readyState === WebSocket.OPEN && client.uuid !== msg.uuid) {
      client.send(JSON.stringify(msg));
    }
  });
}

module.exports = wss1