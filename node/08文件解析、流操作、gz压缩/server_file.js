const http = require('http')
const common = require('./libs/common')

// 数据交互
let server = http.createServer((req, res) => {
    let arr = []
    req.on('data', (data) => {
        arr.push(data)
    })
    req.on('end', () => {
        let data = Buffer.concat(arr)

        //解析二进制文件上传
        //contentType 有的话就是文件上传
        let post = {},
            files = {},
            contentType = req.headers['content-type']
        if(contentType)  {
            let str = contentType.split('; ')[1]
            if(str) {
                let boundary = '--'+str.split('=')[1]

                //1.用'分隔符切割整个数据'
                let arr = data.split(boundary)

                //2.丢弃头尾两个空的数据
                arr.shift()
                arr.pop()

                //3.丢弃每个数据头尾的“\r\n”
                arr=arr.map(buffer => buffer.slice(2).toString())

                //4. 每个数据在第一个'\r\n\r\n'处切成两半, 分别是数据值和文件内容
                arr.forEach(buffer => {
                    let n = buffer.indexOf('\r\n\r\n'),
                        disposition = buffer.slice(0, n),
                        content = buffer.slice(n+4)

                        disposition = disposition.toString()

                    if(disposition.indexOf('\r\n') == -1) {
                        //普通数据
                        content = content.toString()
                        let name = disposition.split('; ')[1].split('=')[1]
                        name = name.substring(1, name.length -1)

                        post[name] = content;
                    }else{
                        //文件数据
                        let [line1, line2] = disposition.split('; ')[1],
                            [,name,filename] = line1.split('; '),
                            type = line2.split(': ')[1];

                        console.log(name, filename, type)
                    }
                })
            }
        }





    })
    res.end()
})

server.listen(8080)
