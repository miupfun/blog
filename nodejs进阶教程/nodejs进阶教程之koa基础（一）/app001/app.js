var koa = require('koa');
var app = new koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/plain';
    ctx.response.body = 'hello world';
});

app.listen(3000, () => {
    console.log('koa app start success!!')
});
