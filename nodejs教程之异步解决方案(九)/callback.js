function a(callback) {
    console.log("A:执行完再其他函数");
    callback();
}

function b(callback) {
    console.log("B:执行完再其他函数");
    callback()
}

function c(callback) {
    console.log("C:执行完再其他函数");
    callback()
}

function test() {
    a(() => {
        console.log('A:执行完了，进入回调')
        b(() => {
            console.log('B:执行完了，进入回调')
            c(() => {
                console.log('C:执行完了，进入回调')
            })
        })
    })
}

test()
