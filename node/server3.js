const http = require('http')
const url = require('url')             //url.paser(整个url)
const quertString = require('querystring')      //quertString.parse(url中的数据部分)
const fs = require('fs')


// 数据交互
let server = http.createServer((req, res) => {
    /** get方式 */
    let {pathname, query} = url.parse(req.url, true)

    let users = {}   // 数据库表

    let str = ""
    req.on('data', (data) => {
        str +=data
    })
    req.on('end', (data) => {
        let post= quertString.parse(str)
        console.log(post)
        // 写东西
        switch(pathname) {
            case '/reg':
                let {user, pass} = query,
                    msg = null

                if(!user) {
                    msg = '{"err":1,"msg":"user is required"}';
                }else if(!pass) {
                    msg = '{"err":1,"msg":"pass is required"}';
                }else if(!/^[\da-z]{2,32}$/.test(user)) {
                    msg = '{"err":1,"msg":"user is invalid"}'
                }else if(/^['|"]$/.test(pass)) {
                    msg = '{"err":1,"msg":"pass is invalid"}'
                }else if(users[user]){
                    msg = '{"err":1,"msg":"user is repeat"}'
                }
                if(msg) {
                    res.write(msg)
                }
                res.end()

                break;
            case '/login':
                break;
            default:
                fs.readFile(`www/${req.url}`, (err, data) => {
                    if(err) {
                        res.writeHeader(404)
                        res.write('404')
                    }else{
                        res.write(data)
                    }
                    res.end()
                })
                break;
        }
    })
})

server.listen(8080)
