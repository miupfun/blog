const koaRouter = require('@koa/router')

// 创建路由模块
const router = new koaRouter()


router.get("/", async (ctx) => {
    const title = 'ejs 测试'
    await ctx.render('index', {
        title
    })
})


module.exports = router
