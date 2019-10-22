const http = require('http')

let server = http.createServer((req, res) => {
    console.log('执行了')
    res.write('aaa')
    res.end()
})

server.listen(8080)
