global.log = require('../lib/Log.js').log;

log('Some', 'log');

function Foo() {
    log('Some', 'log', 'in', 'constructor');
}
Foo.prototype.bar = function() {
    log('Some', 'log', 'in', 'Foo.bar()');
}

function Bar() {
    log('Some', 'log', 'in', 'Bar()');
}

var obj = new Foo();
obj.bar();

Bar();

// Result:
// [2012-09-30 15:53:44] [-] Some log
// [2012-09-30 15:53:44] [new Foo] Some log in constructor
// [2012-09-30 15:53:44] [Foo] Some log in Foo.bar()
// [2012-09-30 15:53:44] [Bar] Some log in Bar()