const url = require('url')
const queryString = require('querystring')

class RouterParser {
    constructor() { }

    parse(req) {
        console.log(req.url)
        const urlInfo = new url.parse(req.url)
        const params = queryString.parse(urlInfo.query)
        console.log("urlInfo", urlInfo)
        console.log("params", params)
        urlInfo.query = params
        urlInfo.req = req;
    }
}

module.exports = RouterParser