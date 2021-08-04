const fs = require("fs")
const util = require("util")
const Path = require("path");

class UserService {
    constructor() {
        //定义保存位置
        this.saveFilePath = Path.join(__dirname, 'data.json')
    }

    async getUserList() {
        // callback函数 转Promise函数
        const readFile = util.promisify(fs.readFile)
        // 把数据读取成字符串
        const dataStr = await readFile(this.saveFilePath, {
            charset: "utf-8"
        });
        const userList = JSON.parse(dataStr);
        return userList;
    }

    async saveUserList(userList) {
        // callback函数 转Promise函数
        const writeFile = util.promisify(fs.writeFile)
        // 把数据保存到文件
        await writeFile(this.saveFilePath, JSON.stringify(userList))
    }

}

module.exports = UserService

