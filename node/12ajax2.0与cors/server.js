const express = require('express')
const body = require('body-parser')
const multer = require('multer')

let server = express()
server.listen(8080)

server.use(body.urlencoded({extended:false})) //解析 x-www-form-urlencoded

//中间件
let multerObj = multer({dest: '../upload'})
server.use(multerObj.any())

//处理请求
server.post('/api', (req, res) => {
    res.send('ok');

    console.log(req.body)
    console.log(req.files)
} )

server.use(express.static('../www'))  //解析静态文件