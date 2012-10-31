global.log = require('../lib/Log.js').log;

log('Some', 'log');

function Foo() {
    log.warn('Some', 'log', 'in', 'constructor');
    log.warnB('Bright', 'Some', 'log', 'in', 'constructor');
}
Foo.prototype.bar = function() {
    log.err('Some', 'log', 'in', 'Foo.bar()');
    log.errB('Bright', 'Some', 'log', 'in', 'Foo.bar()');
}

function Bar() {
    log.ok('Some', 'log', 'in', 'Bar()');
    log.okB('Bright', 'Some', 'log', 'in', 'Bar()');
}

var obj = new Foo();
obj.bar();

Bar();

log('Other:');
log.awa('log.awa()');
log.awaB('log.awaB()');
log.info('log.info()');
log.infoB('log.infoB()');
log.msg('log.msg()');
log.msgB('log.msgB()');

// Result:
// [2012-09-31 19:07:56] [-] Some log
//  [2012-09-31 19:07:56] [new Foo] Some log in constructor
//  [2012-09-31 19:07:56] [new Foo] Bright Some log in constructor
//  [2012-09-31 19:07:56] [Foo] Some log in Foo.bar()
//  [2012-09-31 19:07:56] [Foo] Bright Some log in Foo.bar()
//  [2012-09-31 19:07:56] [Bar] Some log in Bar()
//  [2012-09-31 19:07:56] [Bar] Bright Some log in Bar()
// [2012-09-31 19:07:56] [-] Other:
//  [2012-09-31 19:07:56] [-] log.awa()
//  [2012-09-31 19:07:56] [-] log.awaB()
//  [2012-09-31 19:07:56] [-] log.info()
//  [2012-09-31 19:07:56] [-] log.infoB()
//  [2012-09-31 19:07:56] [-] log.msg()
//  [2012-09-31 19:07:56] [-] log.msgB()