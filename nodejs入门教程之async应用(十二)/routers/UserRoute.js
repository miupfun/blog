const fs = require("fs")
const util = require("util")
const Path = require("path");


class UserRoute {
    constructor() {
        this.tokenIndex = 0
        //定义保存位置
        this.saveFilePath = Path.join(__dirname, 'data.json')
    }

    async register(req, res) {
        console.log('注册')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("参数异常") // 返回前端
        }

        // callback函数 转Promise函数
        const readFile = util.promisify(fs.readFile)
        // 把数据读取成字符串
        const dataStr = await readFile(this.saveFilePath, {
            charset: "utf-8"
        });
        const userList = JSON.parse(dataStr);
        const alreadyHave = userList.find(s => s.username === username)
        if (alreadyHave) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("用户已存在") // 返回前端
        }
        userList.push({
            username: username,
            password: password,
            nickname: '未命名',
            loginToken: null,
        })
        const writeFile = util.promisify(fs.writeFile)
        

        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        res.end("注册成功") // 返回前端
    }

    async login(req, res) {
        console.log('登陆')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("参数异常") // 返回前端
        }
        const alreadyHave = this.userList.find(s => s.username === username)
        if (!alreadyHave) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("用户不存在") // 返回前端
        }
        if (alreadyHave.password !== password) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("密码错误") // 返回前端
        }
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});

        const token = Date.now() + '-' + this.tokenIndex
        alreadyHave.token = token;
        res.end(token) // 返回前端
    }

    async changeNickname(req, res) {
        console.log('改昵称')
        const token = req.query.token;
        const nickname = req.query.nickname;
        if (!nickname || !token) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("参数异常") // 返回前端
        }
        const user = this.userList.find(u => u.loginToken === token)
        if (!user) {
            res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
            res.end("用户不存在") // 返回前端
        }

        user.nickname = nickname
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        res.end(JSON.stringify(user)) // 返回前端
    }

    async handelOther(req, res) {
        console.log('404')
        res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
        res.end("您访问的地址不存在") // 返回前端
    }

}

module.exports = UserRoute
