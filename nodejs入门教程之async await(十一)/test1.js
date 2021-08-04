async function test1() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const name = "Jason";
            resolve(name);
        }, 1000)
    })
}

async function test2() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {

            reject(new Error('Jason'));
        }, 1000)
    })
}

async function main() {
    const data1 = await test1();
    console.log(data1);//打印出Jason

    try {
        const data2 = await test2();
        console.log(data2);//打印出Jason2
    } catch (e) {
        console.log(e)
    } finally {
        console.log("finally")
    }

    test2().then(data2 => {
        console.log(data2)
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        console.log("finally")
    })
}

main()
