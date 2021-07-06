const url = require('url')
const queryString = require('querystring')
const UserRoute = require('./routers/userRoute')

class Router {
    constructor() {  // c创建一个路由模块
        // 这个路由模块注册了一个名为用户信息的路由想过对象
        this.userRoute = new UserRoute()
    }

    handle(req, res) { // 处理req和res
        console.log(req.url)
        const request = new url.parse(req.url)
        const params = queryString.parse(request.query)
        console.log("urlInfo", request)
        console.log("params", params)
        request.query = params
        request.req = req;

        switch (request.pathname) { // 根据解析出来的pathname链接到用户信息模块路由的对应参数上
            case '/register': //注册
                this.userRoute.register(request, res);
                break
            case '/login': //登陆
                this.userRoute.login(request, res)
                break
            case '/changeNickname': //改昵称
                this.userRoute.changeNickname(request, res)
                break
            case '/getAvatar':
                this.userRoute.getAvatar(request, res)
                break
            default: // 其他路由
                this.userRoute.handelOther(request, res);
                break
        }

    }
}

module.exports = Router