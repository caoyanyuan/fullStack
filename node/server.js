const http = require('http')

let server = http.createServer((req, res) => {
    let arr = []

    req.on('data', data => {
        console.log(data)
        arr.push(data)
    })
    req.on('end', () => {
        let data = Buffer.concat(arr)

        res.end()
    })


})

server.listen(8080)
