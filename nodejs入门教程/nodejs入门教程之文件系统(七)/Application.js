const http = require("http");
const Router = require("./Router");


class Application {

    /**
     *  创建服务
     * @param port 服务运行的端口号
     */
    constructor(port) {
        this.port = port
        this.server = null;
        this.router = new Router()
    }

    boot() {
        this.server = http.createServer(((req, res) => {
            this.router.handle(req, res);
        }));
        this.server.listen(this.port, () => {
            console.log("server start success")
        })
    }
}


module.exports = Application;
