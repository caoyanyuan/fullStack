const http = require('http')
const url = require('url')             //url.paser(整个url)
const quertString = require('querystring')      //quertString.parse(url中的数据部分)

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
        let post= quertString.parse(str)
        console.log(post)
    })
    res.end()
})

server.listen(8080)
