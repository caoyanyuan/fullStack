const request=require('./libs/request');
const fs=require('fs');

(async()=>{
  try{
    let {body, headers}=await request('https://www.baidu.com/img/bd_logo1.png?where=super');

    fs.writeFile(`tmp/logo.png`, body, err=>{
      console.log(err);
    });
  }catch(e){
    console.log('请求失败');
  }
})();
