const fs = require('fs')
const got = require('got')
const path = require('path')

class DataSaver {

    constructor() { }

    async saveList(imgList) {
        for (const imgItem of imgList) {
            await this.saveImgItem(imgItem)
        }
    }


    async saveImgItem(imgItem) {
        const imgName = imgItem.name;
        const url = imgItem.imgUrl;

        const savePath = path.join(__dirname, 'imgs', imgName + '.gif')
        const imgInputSteam = got.stream(url);
        const imgSaveOutSteam = fs.createWriteStream(savePath);
        imgInputSteam.pipe(imgSaveOutSteam)
        imgInputSteam.on('error', (e) => {
            console.log(e)
        })
    }

}

module.exports = DataSaver