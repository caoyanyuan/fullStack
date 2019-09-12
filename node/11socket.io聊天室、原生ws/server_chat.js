const http = require('http')
const io = require('socket.io')

let httpServer = http.createServer()
httpServer.listen(8080)

let wsServer = io.listen(httpServer)

let aSock = [];
wsServer.on('connection', sock => {
    aSock.push(sock);

    sock.on('disconnect', () => {
        let n = aSock.indexOf(sock)

        if(n!=-1) {
            aSock.splice(n, 1)
        }
    })

    sock.on('msg', str => {
        aSock.forEach(s => {
            if(s!=sock) {
                s.emit('msg', str)
            }
        })
    })
})
