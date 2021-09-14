const promiseA = new Promise(function (resolve, reject) {
    console.log("AAA:start");
    setTimeout(() => {
        resolve()
    }, 100)
});

const promiseB = new Promise(function (resolve, reject) {
    console.log("BBB:start");
    setTimeout(() => {
        resolve()
    }, 50)
});
promiseA.then(() => {
    console.log("AAA:finish")
});
promiseB.then(() => {
    console.log("BBB:finish")
})
