const request=require('./libs/request');
const fs=require('fs');

(async()=>{
  try{
    let {body, headers}=await request('https://shouji.tmall.com/');

    fs.writeFile(`tmp/tmall_shouji.html`, body, err=>{
      console.log(err);
    });
  }catch(e){
    console.log('请求失败');
  }
})();
