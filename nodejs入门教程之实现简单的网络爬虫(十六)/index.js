const DataGet = require('./dataGet')

async function start() {
    const dataGet = new DataGet();

    const data = await dataGet.getData({
        url: 'https://www.fabiaoqing.com/biaoqing'
    })



}

start()