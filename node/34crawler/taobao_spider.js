const pathlib=require('path');
const fs=require('fs')
const request = require('./lib/request');

(async()=>{
    try{
        let {body, headers}=await request('https://taobao.com/');

        fs.writeFile(pathlib.resolve('temp', 'taobao.html'), body, err=>{
            console.log(err);
        });
    }catch(e){
      console.log('请求失败', e);
    }
  })();
