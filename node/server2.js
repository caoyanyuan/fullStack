const http = require('http')
const url = require('url')

// 数据交互
let server = http.createServer((req, res) => {
    /** get方式
     * let {pathname, query} = url.parse(req.url, true)
    
        console.log(pathname, query)
        res.end()
     */
    
    // post
    let str = ""
    req.on('data', (data) => {
        str +=data
    })
    req.on('end', (data) => {
        console.log(str)
    })
    res.end()
})

server.listen(8080)
