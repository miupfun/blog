const got = require('got');

class DataGet {
    constructor() {
    }

    async getData(params) {
        console.log('开始请求远程服务器数据')
        const response = await got(params.url);
        console.log('成功获取到了数据')
        return response.body;
    }
}

module.exports = DataGet