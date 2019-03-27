const robot = require('robotjs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const screenSize = robot.getScreenSize();
const screenW = screenSize.width;
const screenH = screenSize.height;

app.use(express.static('./'));

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('pos', data => {
    const headPos = data[0];
    
  /*    
    
    // 240 (far left) <- ((200 midpoint)) -> 160 (far right)
    // 0        50 (.5 * screenW)         100 (1 * screenW)
    /////////////////////////////////////////////////
    // 240           200                   160
    
    y axis --- 160 - 130


    */

    // each x 
    // -40.5  (screenW / 80)
    const x = Math.round(((data[0][0] - 240) * (screenW / 80))) * -1; //((data[0][0]) / 100) * screenW;
    const y = Math.round((data[0][1] - 160) * (screenH / 30)); // (((data[0][1] * -1) - 190) * (screenH / 50));
    console.log(x, y);

    robot.moveMouse(x,y);
  })
});

http.listen(8080, () => {
  console.log('listening on 8080');
});