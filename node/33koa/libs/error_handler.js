module.exports = server => {
    server.use(hanlder)
}

async function hanlder(ctx, next) {
    try {
        await next()
    }catch(e) {
        console.log(e)
        ctx.body = "服务器正在维护中，请稍后重试"
    }
}