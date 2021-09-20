const koaRouter = require('@koa/router')

// 创建路由模块
const router = new koaRouter()


router.get("/c", async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world C!</h1>';
})

router.get("/d", async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world D!</h1>';
})

module.exports = router
