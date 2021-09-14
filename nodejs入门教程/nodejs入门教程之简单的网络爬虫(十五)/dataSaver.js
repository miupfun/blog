const fs = require('fs')
const got = require('got')
const path = require('path')

class DataSaver {

    constructor() {}

    async saveList(imgList) {
        for (const imgItem of imgList) {
            await this.saveImgItem(imgItem)
        }
    }


    async saveImgItem(imgItem) {
        return new Promise((resolve, reject) => {
            console.log('开始保存')
            const imgName = imgItem.name;
            console.log(imgItem.name)
            const url = imgItem.imgUrl;
            // 表情包图片保持的地址
            const savePath = path.join(__dirname, 'imgs', imgName + '.gif')
            // 使用got获取表情包图片文件的输入流
            const imgInputSteam = got.stream(url);
            // 保存图片的输出流
            const imgSaveOutSteam = fs.createWriteStream(savePath);
            // 将文件输入流对接到本地保存的输出流
            imgInputSteam.pipe(imgSaveOutSteam)
            // 监听事件
            imgInputSteam.on('error', (e) => {
                console.error('保持失败：' + savePath)
                reject(e)
            })
            imgSaveOutSteam.on('finish', () => {
                console.log('保存完毕：' + savePath)
                resolve()
            })
            imgSaveOutSteam.on('error', (e) => {
                console.error('保持失败：' + savePath)
                reject(e)
            })
        })
    }

}

module.exports = DataSaver