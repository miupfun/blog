
const EventEmitter = require('events').EventEmitter;
const myEvent = new EventEmitter();
myEvent.on('finish', function () {
    console.log('finish 事件触发');
});
setTimeout(function () {
    myEvent.emit('finish');
}, 1000);
