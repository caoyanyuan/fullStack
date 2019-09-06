const http = require('http')
const fs = require('fs')

let server = http.createServer((req, res) => {
    let rs = fs.createReadStream(`../www/${req.url}`)
    rs.pipe(res)

    rs.on('error', err => {
        res.writeHeader(404)
        res.write('NOT FOUND')

        res.end()
    })
})

server.listen(8080)
