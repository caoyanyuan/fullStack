const request=require('./libs/request');
const fs=require('fs');

(async()=>{
  try{
    let {body, headers}=await request('http://www.zhihu.com/');

    fs.writeFile(`tmp/zhihu.html`, body, err=>{
      console.log(err);
    });
  }catch(e){
    console.log('请求失败');
  }
})();
