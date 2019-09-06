const http = require('http')
const fs = require('fs')
const uuid = require('uuid/v4')

let server = http.createServer((req, res) => {
    let arr = []
    req.on('data', (data) => {
        arr.push(data)
    })
    req.on('end', () => {
        //解析二级制文件上传数据
            let post = {},
            files = {}
        if(req.headers['content-type']) {

        }
    })

})
