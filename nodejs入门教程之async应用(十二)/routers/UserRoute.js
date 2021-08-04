const UserService = require("./UserService");

class UserRoute {
    constructor() {
        this.tokenIndex = 0
        this.userService = new UserService()
    }

    async register(req, res) {
        console.log('注册')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }

        const userList = await this.userService.getUserList();
        const alreadyHave = userList.find(s => s.username === username)
        if (alreadyHave) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("用户已存在") // 返回前端
        }
        userList.push({
            username: username,
            password: password,
            nickname: '未命名',
            loginToken: null,
        })
        await this.userService.saveUserList(userList)
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end("注册成功") // 返回前端
    }

    async login(req, res) {
        console.log('登陆')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }
        const userList = await this.userService.getUserList()
        const alreadyHave = userList.find(s => s.username === username)
        if (!alreadyHave) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("用户不存在") // 返回前端
        }
        if (alreadyHave.password !== password) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("密码错误") // 返回前端
        }
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

        const token = Date.now() + '-' + this.tokenIndex
        alreadyHave.token = token;
        res.end(token) // 返回前端
    }

    async changeNickname(req, res) {
        console.log('改昵称')
        const token = req.query.token;
        const nickname = req.query.nickname;
        if (!nickname || !token) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }
        const userList = await this.userService.getUserList();
        const user = userList.find(u => u.loginToken === token)
        if (!user) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("用户不存在") // 返回前端
        }

        user.nickname = nickname
        await this.userService.saveUserList(userList);
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end(JSON.stringify(user)) // 返回前端
    }

    async handelOther(req, res) {
        console.log('404')
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end("您访问的地址不存在") // 返回前端
    }

}

module.exports = UserRoute
