const DataGet = require('./dataGet');
const DataParser = require('./dataParser');
const DataSaver = require('./dataSaver');

async function start() {
    const dataGet = new DataGet();
    const dataParser = new DataParser()
    const dataSaver = new DataSaver()

    const data = await dataGet.getData({
        url: 'https://www.fabiaoqing.com/biaoqing'
    })
    const datas = await dataParser.parseData(data)
    await dataSaver.saveList(datas)
}

start()