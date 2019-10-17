const express=require('express');
const cookieParser=require('cookie-parser');

let server=express();
server.listen(8080);

server.use(cookieParser('dfdsgfjfyt6dr5setrgdxgxhgDGFDHY%7yt^%Tdfsdtryrt$%#$%$#$#%RFgdfdfxghfEFGFDDF'));

server.get('/a', (req, res)=>{
  console.log(req.cookies);
  console.log(req.signedCookies);

  res.cookie('c', 33, {signed: true});

  res.send('aaa');
});
