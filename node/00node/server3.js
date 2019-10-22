const http = require('http')
const url = require('url')             //url.paser(整个url)
const quertString = require('querystring')      //quertString.parse(url中的数据部分)
const fs = require('fs')

let users = {}   // 数据库表

// 数据交互
let server = http.createServer((req, res) => {
    /** get方式 */
    let {pathname, query} = url.parse(req.url, true)

    let str = ""
    req.on('data', (data) => {
        str +=data
    })
    req.on('end', (data) => {
        let post= quertString.parse(str),
            {user, pass} = query,
            msg = '{"code":0,"msg":"success"}'
        // 写东西
        switch(pathname) {
            case '/reg':

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
                }else{
                    users[user] = pass
                }

                res.write(msg)
                res.end()

                break;
            case '/login':

                if(!user) {
                    msg = '{"err":1,"msg":"user is required"}';
                }else if(!pass) {
                    msg = '{"err":1,"msg":"pass is required"}';
                }else if(!/^[\da-z]{2,32}$/.test(user)) {
                    msg = '{"err":1,"msg":"user is invalid"}'
                }else if(/^['|"]$/.test(pass)) {
                    msg = '{"err":1,"msg":"pass is invalid"}'
                }else if(users[user] !== pass ){
                    msg = '{"err":1,"msg":"on error"}'
                }

                res.write(msg)
                res.end()

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
