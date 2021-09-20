const koaRouter = require('@koa/router')

// 创建路由模块
const router = new koaRouter()


router.get("/a", async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world A!</h1>';
})

router.get("/b", async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world B!</h1>';
})
module.exports = router
