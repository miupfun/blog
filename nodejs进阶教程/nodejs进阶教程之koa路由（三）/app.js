const koa = require('koa');
const app = new koa();
const router = require('./routes')
// 使用路由模块的路由控制插件
app.use(router.routes())

// 使用路由模块请求方法拦截模块
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('koa app start success!!')
});
