const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => { // 这个函数就是一个中间件
    console.log("前置处理器 中间件1")
    await next()
    console.log("后置处理器 中间件1")
});

app.use(async (ctx, next) => { // 这个函数就是一个中间件
    console.log("前置处理器 中间件2")
    await next()
    console.log("后置处理器 中间件2")
});

app.use(async (ctx, next) => { // 这个函数就是一个中间件
    console.log("前置处理器 中间件3")
    await next()
    console.log("后置处理器 中间件3")
});

app.use(async (ctx, next) => { // 这里处理请求
    await next()
    console.log("处理请求")
    ctx.response.type = 'text/plain';
    ctx.response.body = 'hello world';
});

app.listen(3000, () => {
    console.log('koa app start success!!')
});