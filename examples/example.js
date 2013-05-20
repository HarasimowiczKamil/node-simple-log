var simpleLog = require('../lib/simple-log.js');
for (var fun in simpleLog) {
    // it's only one method to replace global console object
    console[fun] = simpleLog[fun];
}

console.config('infoTemplate', '[{parent.method}] [{time}] : ');
console.config('infoColor', 'light-magenta');

console.log('Some', 'log');

function Foo() {
    console.warn('Some', 'log', 'in', 'constructor');
}
Foo.prototype.bar = function() {
    console.error('Some', 'log', 'in', 'Foo.bar()');
}

Foo.prototype.far = function() {
    console.info('Some', 'log', 'in', 'Foo.far()');
}

function Bar() {
    console.ok('Some', 'log', 'in', 'Bar()');
}

var obj = new Foo();
obj.bar();
obj.far();

Bar();

console.log('Other:');
console.info('log.info()');
console.msg('log.msg()');

console.name('msg').log('log.msg()');

console.config('myLogTemplate', '{time} {ref-file-line} | {arguments}');
console.config('myLogColor', 'light-red');
console.config('myLogArgColor', 'underline');
console.name('myLog').log('my custom log');

// Result:
// [2013-04-20 11:01:33] [-]: Some log
// [2013-04-20 11:01:33] [new Foo]: Some log in constructor
// [2013-04-20 11:01:33] [/example.js]: Some log in Foo.bar()       
// [Foo.far] [2013-04-20 11:01:33] : Some log in Foo.far()
// [2013-04-20 11:01:33] [Bar]: Some log in Bar()
// [2013-04-20 11:01:33] [-]: Other:
// [-] [2013-04-20 11:01:33] : log.info()
// [2013-04-20 11:01:33] [-]: log.msg()
// [2013-04-20 11:01:33] [-]: log.msg()
// 2013-04-20 11:01:33 {ref-file-line} | my custom log