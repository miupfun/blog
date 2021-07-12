const fs = require('fs')
const path = require('path')

console.log(__dirname)

// 同步测试
function tongbuTest() {
    const itl = setInterval(() => {
        console.log('task do...')
    }, 0)
    console.log('开始读取文件')
    console.time('读取文件')
    const data = fs.readFileSync(path.join(__dirname, 'file/pexels-daniel-torobekov-5694144.jpg'));
    console.timeEnd('读取文件')
    console.log('读取文件结束')
}

// 异步测试
function yibuTest() {
    const itl = setInterval(() => {
        console.log('task do...')
    }, 0)
    console.log('开始读取文件')
    console.time('读取文件')
    fs.readFile(path.join(__dirname, 'file/pexels-daniel-torobekov-5694144.jpg'), () => {
        console.timeEnd('读取文件')
        console.log('读取文件结束')
    });
}

tongbuTest()
