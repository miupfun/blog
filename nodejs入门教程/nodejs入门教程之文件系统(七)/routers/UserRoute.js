const fs = require('fs')
const path = require('path')

class UserRoute {

    constructor() {
        this.userList = []
        this.tokenIndex = 0
    }

    register(req, res) {
        console.log('注册')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }

        const alreadyHave = this.userList.find(s => s.username === username)
        if (alreadyHave) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("用户已存在") // 返回前端
        }
        this.userList.push({
            username: username,
            password: password,
            nickname: '未命名',
            loginToken: null,
        })

        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end("注册成功") // 返回前端
    }

    login(req, res) {
        console.log('登陆')
        const username = req.query.username;
        const password = req.query.password;

        if (!username || !password) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }
        const alreadyHave = this.userList.find(s => s.username === username)
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

    changeNickname(req, res) {
        console.log('改昵称')
        const token = req.query.token;
        const nickname = req.query.nickname;
        if (!nickname || !token) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("参数异常") // 返回前端
        }
        const user = this.userList.find(u => u.loginToken === token)
        if (!user) {
            res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end("用户不存在") // 返回前端
        }

        user.nickname = nickname
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end(JSON.stringify(user)) // 返回前端
    }

    getAvatar(req, res) {
        //先获取文件读取流，也就输入流， path是一个专门处理文件夹路径的模块
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
	   // 属于http协议中的内容，设置返回的内容类型
        readStream.pipe(res)
	  // 把文件读取流写入到响应流中
    }

    handelOther(req, res) {
        console.log('404')
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end("您访问的地址不存在") // 返回前端
    }

}
module.exports = UserRoute