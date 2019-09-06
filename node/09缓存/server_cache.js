const http = require('http')
const fs = require('fs')

//fs.stat读取文件状态
let server = http.createServer((req, res) => {
    let url = `../www/${req.url}`
    fs.stat(url, (err, stat) => {
        if(err) {
            res.writeHeader(404);
            res.write('NOT FOUND');
            res.end();
        }else{
            if(req.headers['if-modified-since']) {
                let oDate = new Date(req.headers['if-modified-since']),
                    time_client = Math.floor(oDate.getTime()/1000),
                    time_server = Math.floor(stat.mtime.getTime()/1000);
                console.log(time_server, time_client)
                if(time_server > time_client) {
                    sendFileToClient()
                }else{
                    res.writeHeader(304);
                    res.write('NOT Modified');
                    res.end();
                }
            }else{
                sendFileToClient()
            }

            function sendFileToClient() {
                let rs = fs.createReadStream(url)
                res.setHeader('Last-modified',stat.mtime.toGMTString())

                rs.pipe(res)

                rs.on('error',err => {
                    res.writeHeader(404);
                    res.write('error on rs',err);
                    res.end();
                })
            }
        }
    })
})

server.listen(8080)
