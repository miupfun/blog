const KoaRouter = require('@koa/router')
const ejsRoute = require('./ejs-route')


const router = new KoaRouter()

router.use("/", ejsRoute.routes(), ejsRoute.allowedMethods())

module.exports = router;
