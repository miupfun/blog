const koa = require('koa');
const app = new koa();
const router = require('./routes')
const views = require('koa-views');
const path = require('path')
const session = require('koa-session');
const koaBody = require('koa-body');

// 配置模板引擎插件
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));
app.use(koaBody())
app.keys = ['app keys']
app.use(session({
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
}, app));


// 使用路由模块的路由控制插件
app.use(router.routes())
// 使用路由模块请求方法拦截模块
app.use(router.allowedMethods())



app.listen(3000, () => {
    console.log('koa app start success!!')
});
