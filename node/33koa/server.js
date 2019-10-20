const Koa=require('koa');
const staticCache=require('koa-static-cache');
const body=require('koa-better-body');
const convert=require('koa-convert');
const session=require('koa-session');
const config=require('./config');
const Router=require('koa-router');
const pathlib=require('path');
const error=require('./libs/error_handler');
const loglib=require('./libs/log');
const ejs=require('koa-ejs');

//连接数据库
let db=require('./libs/db');

let server = new Koa()
server.listen(config.port)

error(server)
loglib(server)

server.use(async (ctx, next)=>{
    ctx.db=db;
  
    await next();
  });

server.use(convert(body({
    uploadDir: config.uploadDir
})));

//ejs
ejs(server, {
    root:     pathlib.resolve('template'),
    layout:   false,
    viewExt:  '.ejs.html',
    cache:    false,
    debug:    false
});

//router
let mainRouter=new Router();
mainRouter.use('/', require('./routers/index'));
//mainRouter.use('/user', require('./routers/user'));
//mainRouter.use('/article', require('./routers/article'));
//mainRouter.use('/admin', require('./routers/admin'));

server.use(mainRouter.routes());


server.use(staticCache(config.wwwDir));
  