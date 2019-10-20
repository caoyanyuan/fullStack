const urllib=require('url');
const pathlib=require('path');
const http=require('http');
const https=require('https');
const fs=require('fs');

function requestUrl(url, headers){
  let urlObj=urllib.parse(url);
  let httpMod=null;

  if(urlObj.protocol=='http:'){
    httpMod=http;
  }else if(urlObj.protocol=='https:'){
    httpMod=https;
  }else{
    throw new Error(`协议无法识别: ${urlObj.protocol}`);
  }

  return new Promise((resolve, reject)=>{
    let req=httpMod.request({
      host: urlObj.host,
      path: urlObj.path,
      headers
    }, res=>{
      if(res.statusCode>=200 && res.statusCode<300 || res.statusCode==304){
        let arr=[];

        res.on('data', data=>{
          arr.push(data);
        });

        res.on('end', ()=>{
          let buffer=Buffer.concat(arr);

          resolve({
            status: 200,
            body:   buffer,
            headers:res.headers
          });
        });
      }else if(res.statusCode==301 || res.statusCode==302){
        resolve({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        });
      }else{
        reject({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        });
      }
    });

    req.on('error', err=>{
      console.log('错了', err);
    });
    req.write('');      //发送POST数据
    req.end();          //正式开始请求
  });
}

async function request(url, reqHeaders){
  try{
    let {status, body, headers}=await requestUrl(url, reqHeaders);
    console.log(status, body, headers);

    if(status==200){
      return {body, headers};
    }else{
      let {status, body, headers: headers2}=await requestUrl(headers.location, reqHeaders);   //?

      fs.writeFile(`tmp/taobao.html`, body);

      console.log(status, body, headers2);
    }
  }catch(e){
    console.log(e);
  }
}

request('http://www.taobao.com/');
