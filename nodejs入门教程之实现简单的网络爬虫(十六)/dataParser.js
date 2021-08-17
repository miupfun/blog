const cheerio = require('cheerio')

class DataParser {

    constructor() {
    }

    async parseData(htmlData) {
        console.log('开始解析数据')
        const $ = cheerio.load(htmlData);

        const datas = new Array()


        const imgDoms$ = $('#bqb > div.ui.segment.imghover > div.tagbqppdiv > a > img.image')

        for (const item$ of imgDoms$) {
            datas.push({
                imgUrl: item$.attribs['data-original'],
                name: item$.attribs['alt']
            })
            console.log('解析到图片：' + item$.attribs['alt'])
        }
        console.log('数据解析完毕')
        return datas;
    }
}

module.exports = DataParser