const http = require('http')
const fs = require('fs')

/** 
 * web服务器
 * 1.返回文件
 * 2.数据交互
 * 3.数据库
 * 
*/
// 返回文件
let server = http.createServer((req, res) => {
    fs.readFile(`www/${req.url}`, (err, data) => {
        if(err) {
            res.writeHeader(404)
            res.write('404')
        }else{
            res.write(data)
        }
        res.end()
    })

  


})

server.listen(8080)
