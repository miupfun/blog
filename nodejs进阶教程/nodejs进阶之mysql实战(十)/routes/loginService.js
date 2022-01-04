const mysql = require('mysql');

// 创建连接数据库
const connection = mysql.createConnection({
    host: 'localhost', // 数据库连接地址
    port: 3306, // 数据库连接端口
    user: 'root', //数据库用户名
    password: 'root.', // 数据库密码
    database: 'user-test' //数据存储库
});

/**
 * 根据用户名密码查询用户列表
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
module.exports.findUserbyUsernameAndPassword = async (username, password) => {
    const query = `select * from user where username=? and password=?`
    return new Promise((resolve, reject) => {
        connection.query(query, [username, password], (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results || [])
            }
        })
    })
}

// 查询所有用户列表
module.exports.findAllUser = async () => {
    const query = `select * from user`
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results || [])
            }
        })
    })
}


// 注册添加用户数据
module.exports.registerUserByUsernameAndpassword = (username, password) => {
    const query = `insert into user(username,password) VALUES(?,?)`
    return new Promise((resolve, reject) => {
        connection.query(query, [username, password], (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}