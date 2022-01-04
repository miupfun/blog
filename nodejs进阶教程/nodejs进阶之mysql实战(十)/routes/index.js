const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const {
    findUserbyUsernameAndPassword,
    registerUserByUsernameAndpassword,
    findAllUser
} = require('./loginService')

/**
 * 登录页路由
 */
router.get("/login.html", async (ctx) => {
    await ctx.render('login', {
        title: '登录',
        error: ctx.request.query.error || ''
    })
})

/**
 * 注册页路由
 */
router.get('/register.html', async (ctx) => {
    await ctx.render('register', {
        title: '注册',
        error: ctx.request.query.error || ''
    })
})

/**
 * 用户列表页（首页）
 */
router.get('/index.html', async (ctx) => {
    if (ctx.session.currentUser) {
        const users = await findAllUser();
        await ctx.render('index', {
            title: "用户列表",
            currentUser: ctx.session.currentUser,
            users: users || []
        })
    } else {
        ctx.redirect('/login.html')
    }
})

/**
 * 登录处理路由
 */
router.post('/login.do', async (ctx) => {
    console.log(ctx.request.body)
    if (!ctx.request.body.username) {
        ctx.redirect(`/login.html?error=用户名不能为空`)
        return
    }
    if (!ctx.request.body.password) {
        ctx.redirect(`/login.html?error=密码不能为空`)
        return
    }
    const users = await findUserbyUsernameAndPassword(ctx.request.body.username, ctx.request.body.password)
    if (users.lengh === 0) {
        ctx.redirect(`/login.html?error=用户名或密码错误`)
        return
    }
    const user = users[0]
    ctx.session.currentUser = user;
    ctx.redirect(`/index.html`)
})

/**
 * 注册处理路由
 */
router.post('/register.do', async (ctx) => {
    console.log(ctx.request.body)
    if (!ctx.request.body.username) {
        ctx.redirect(`/register.html?error=用户名不能为空`)
        return
    }
    if (!ctx.request.body.password) {
        ctx.redirect(`/register.html?error=密码不能为空`)
        return
    }
    if (ctx.request.body.password !== ctx.request.body.password2) {
        ctx.redirect(`/register.html?error=两次密码不匹配`)
        return
    }
    await registerUserByUsernameAndpassword(
        ctx.request.body.username,
        ctx.request.body.password
    )
    ctx.redirect(`/register.html`)
})

/**
 * 注销处理路由
 */
router.get('/logout.do', async (ctx) => {
    delete ctx.session.currentUser
    ctx.redirect(`/login.html`)
})
module.exports = router;
