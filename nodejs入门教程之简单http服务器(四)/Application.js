const http = require("http")


class Application {

    /**
     *  创建服务
     * @param port 服务运行的端口号
     */
    constructor(port) {
        this.port = port
        this.server = null;
    }

    boot() {
        this.server = http.createServer(((req, res) => {
            console.log('request coming')
            res.writeHead(200);
            res.end("hello world")
        }));
        this.server.listen(this.port, () => {
            console.log("server start success")
        })
    }
}


module.exports = Application;
