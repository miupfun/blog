const DataGet = require('./dataGet');
const DataParser = require('./dataParser');
const DataSaver = require('./dataSaver');

async function start() {
    const dataGet = new DataGet();
    const dataParser = new DataParser()
    const dataSaver = new DataSaver()

    console.log('开始从服务端获取数据')
    const data = await dataGet.getData({
        url: 'https://www.fabiaoqing.com/biaoqing'
    })
    console.log('服务端获取数据完毕')

    console.log('开始解析html数据')
    const datas = await dataParser.parseData(data)
    console.log('html数据解析完毕')

    console.log('开始保存图片列表')
    await dataSaver.saveList(datas)
    console.log('图片列表保存完毕')
}

start()