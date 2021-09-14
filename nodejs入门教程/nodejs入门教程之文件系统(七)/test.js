const fs = require('fs')


function pipeText() {
    //创建读取文件流
    const readStream = fs.createReadStream(__dirname + '/files/1.txt')

    //创建写入文件流
    const writeStream = fs.createWriteStream(__dirname + '/files/2.txt')


    //将读取文件流流向写入文件流完成文件写入
    readStream.pipe(writeStream)
}

function readText() {
    const readStream = fs.createReadStream(__dirname + '/files/1.txt')

    //创建写入文件流
    const writeStream = fs.createWriteStream(__dirname + '/files/2.txt')

    readStream.on('data', (data) => {
        console.log('读取到了数据')
        writeStream.write(data)
    })

    writeStream.on('finish', () => {
        console.log('写入完毕')
    })
    readStream.on('end', () => {
        console.log('读取完毕')
        writeStream.end()
        writeStream.close()
        readStream.close()
    })


    readStream.on('error', (e) => {
        console.log('读取失败')
        console.log(e)
    })

    writeStream.on('error', (e) => {
        console.log('写入失败')
        console.log(e)
    })


}

readText()


