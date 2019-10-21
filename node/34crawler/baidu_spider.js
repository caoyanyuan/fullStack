const urllib=require('url');
const pathlib=require('path');
const http=require('http');
const https=require('https');
const fs=require('fs');

let req = http.request('http://www.baidu.com/', res => {
    if(res.statusCode>=200 && res.statusCode<300 || res.statusCode==304) {
        let arr = [];

        res.on('data', data => {
            arr.push(data)
        })

        res.on('end', data => {
            let buffer = Buffer.concat(arr);

            fs.writeFile(pathlib.resolve('temp', 'baidu.html'), buffer, err => {
                if(err) {
                    console.log('写入文件失败', err)
                }else{
                    console.log('完成')
                }
            })
        })
    }else{
        console.log('错了',res.statusCode)
    }
})
req.on('error', err => {
    console.log('错了',err)
})
req.write('');
req.end()
