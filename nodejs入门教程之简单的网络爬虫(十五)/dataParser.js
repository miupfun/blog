const cheerio = require('cheerio')

class DataParser {

    constructor() {}

    async parseData(htmlData) {
        console.log('开始解析数据')
        const $ = cheerio.load(htmlData);

        const datas = new Array()


        // 这个是使用cheerio选择器来获取到所有表情包图片的dom对象
        // 可以看出来cheerio的用法和jquery还是很像的
        const imgDoms$ = $('#bqb > div.ui.segment.imghover > div.tagbqppdiv > a > img.image')

        // 遍历所有的表情包dom对象
        for (const item$ of imgDoms$) {
            // 获取到表情包名字
            const name = item$.attribs['alt']
            // 获取到表情包的图片地址
            const url = item$.attribs['data-original']
            // 表情包名字替换掉换行（\n）和斜杠（\,/）
            const parsedName = name.replace(/\n/g, '').replace(/\\/g, '').replace(/\//g, '')
            datas.push({
                imgUrl: url,
                name: parsedName
            })
            console.log('解析到图片：' + parsedName)
        }
        console.log('数据解析完毕')
        return datas;
    }
}

module.exports = DataParser