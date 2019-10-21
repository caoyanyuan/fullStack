const JSDOM=require('jsdom').JSDOM;
const fs=require('fs');

fs.readFile('test.html', (err, buffer)=>{
  if(err){
    console.log('读取失败');
  }else{
    let html=buffer.toString();

    //
    let jsdom=new JSDOM(html);
    let document=jsdom.window.document;
    let $=document.querySelectorAll.bind(document);

    let oTxt=$('input.txt1')[0];

    console.log(oTxt.value);
  }
});
