const url = require("url")
const querystring = require('querystring')


// 解析出来pathname
const parsedUrl = url.parse("http://localhost:8080/register?username=zhangsan&password=123456")
console.log(parsedUrl)
// 输出：
// {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'localhost:8080',
//   port: '8080',
//   hostname: 'localhost',
//   hash: null,
//   search: '?username=zhangsan&password=123456',
//   query: 'username=zhangsan&password=123456',
//   pathname: '/register',
//   path: '/register?username=zhangsan&password=123456',
//   href: 'http://localhost:8080/register?username=zhangsan&password=123456'
// }
// ------------------------------------------------------------------------
// 解析出来参数
const params = querystring.parse(parsedUrl.query)
console.log(params)
// 输出： { username: 'zhangsan', password: '123456' }

