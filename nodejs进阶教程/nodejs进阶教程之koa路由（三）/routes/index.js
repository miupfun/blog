const KoaRouter = require('@koa/router')
const routeA = require('./routea')
const routeB = require('./routeb')


const router = new KoaRouter()

router.use("/a", routeA.routes(), routeA.allowedMethods())
router.use("/b", routeB.routes(), routeB.allowedMethods())

module.exports = router;
