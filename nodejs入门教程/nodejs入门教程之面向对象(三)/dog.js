const Animal = require('./animal')



class Dog extends Animal {
    constructor() {
        super()
    }

    say() {
        super.say()
        console.log('I am a Dog also!')
    }

}

const myDog = new Dog();
myDog.say()

console.log(myDog instanceof Animal)
console.log(myDog instanceof Dog)