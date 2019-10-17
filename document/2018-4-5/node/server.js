const http=require('http');
const urllib=require('url');

let server=http.createServer((req, res)=>{
  let {pathname, query}=urllib.parse(req.url, true);

  console.log(pathname, query);
});
server.listen(8080);
