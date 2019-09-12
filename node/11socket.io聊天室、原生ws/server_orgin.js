const http = require('http')
const net = require('net')
const crypto = require('crypto')

let server = net.createServer(sock =>{
    //握手-只有一次
    sock.once('data', data => {
        console.log('hand shake start')


        let str = data.toString(),
            lines = str.split('\r\n');

        //1.舍弃第一行（GET / HTTP/1.1）和最后两行 （空白的）
        lines = lines.slice(1, lines.length - 2)

        //2.切开data得到headers
        let headers = {};
        lines.forEach(line => {
            let [key, value] = line.split(': ');
            console.log(key, value, line)
            headers[key.toLowerCase()] = value;
        })
        console.log(headers)

        if(headers['upgrade'] != 'websocket') {
            console.log('除ws以外的其他协议不会处理')
            sock.end()
        }else if(headers['sec-websocket-version'] != '13'){
            console.log('ws版本不对', headers['sec-websocket-version'])
            sock.end()
        }else {
            let key = headers['sec-websocket-key'];
            let mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            let hash = crypto.createHash('sha1');
            hash.update(key+mask);
            let key2 = hash.digest('base64');
            sock.write(`HTTP/1.1 101 Switiching Protocols\r\nUpgrade: websocket\r\nConnection:Upgrade\r\nSec-WebSocket-Accept:${key2}\r\n\r\n`)

            //走到这一步时候的浏览器
            /**
             * Status Code: 101 Switiching Protocols
                Connection: Upgrade
                Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
                Sec-WebSocket-Key: XAY8Vv8po8WyP9IDfFpf6Q==
                Sec-WebSocket-Version: 13
                Upgrade: websocket
             */
        }

        //真正的数据
        sock.on('data', data => {

        })
    })

    sock.on('end', () => {})
})

server.listen(8080)
