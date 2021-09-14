// 第一步，我们创建一个去玩lol的约定
console.log('你下班陪我去打lol')
const playLolPromise = new Promise(
    function (resolve, reject) {
        let workOvertime = false // 是否加班
        setTimeout(() => {
            console.log('到下班时间了')
            if (workOvertime) { // 加班了
                reject(new Error('我加班了')) // 数据处理出错
            } else { // 没有加班
                resolve(true) // 数据处理完成
            }
        }, 100)
    }
)

playLolPromise.then((res) => {
    console.log('我没加班，我准时来了')
    console.log('我成功守约')
}).catch((e) => {
    console.log('我没有守约,因为：' + e.message)
}).finally(() => {
    console.log('不管有没有守约，我都要通知你')
})


