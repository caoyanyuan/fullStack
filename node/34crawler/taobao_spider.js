const urllib=require('url');
const pathlib=require('path');
const http=require('http');
const https=require('https');
const assert=require('assert');
const fs=require('fs')

function requestUrl(url, headers) {
    let urlObj = urllib.parse(url);
    let httpMod = null

    if(urlObj.protocol == "http:") {
        httpMod = http
    }else if(urlObj.protocol == "https:") {
        httpMod = https
    }else{
        throw new Error(`协议无法识别：${urlObj.protocol}`)
    }

    return new Promise((resolve, reject) => {
        let req = httpMod.request({
            host: urlObj.host,
            path: urlObj.path,
            headers
        }, res => {
            //console.log(res.statusCode)
            if(res.statusCode>=200 && res.statusCode<300 || res.statusCode==304) {
                let arr = []

                req.on('data', data => {
                    arr.push(data)
                })
                req.on('end', () => {
                    let buffer = Buffer.concat(arr);

                    resolve({
                        status: 200,
                        body: buffer,
                        headers: res.headers
                    })
                })
            }else if(res.statusCode==301 || res.statusCode==302) {
                // 重定向的时候给出去不同的status,以供再去请求重定向的链接
                resolve({
                    status: res.statusCode,
                    body: null,
                    headers: res.headers
                })
            }else{
                reject({
                    status: res.statusCode,
                    body: null,
                    headers: res.headers
                })
            }
        })

        req.on('error', err=>{
            console.log('错了', err);
        });
        req.write('');      //发送POST数据
        req.end();          //正式开始请求
    })
}

async function request(url, reqHeaders) {
    try{
        let ret = null
        while (1) {
            console.log('我能执行几次呢？')
            console.log(await requestUrl(url, reqHeaders))
           // let { status, body, headers } =


            if(status == 200) {
                console.log('return值出去')
                ret = { body, headers }
                return {
                    body: '12'
                }
            }else{
                assert(status==301 || status==302);
                assert(headers.location);

                url = headers.location
            }
        }

    }catch(e) {
        console.log(e)
    }
}

(async()=>{
    try{
        request('https://shouji.tmall.com/').then(data => {
            console.log(data)
        })
        let {body, headers}=await request('https://shouji.tmall.com/');
        console.log(body, headers)

    //   fs.writeFile(pathlib.resolve('temp', 'taobao.html'), body, err=>{
    //     console.log(err);
    //   });
    }catch(e){
      console.log('请求失败', e);
    }
  })();
