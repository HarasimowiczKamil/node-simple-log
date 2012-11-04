nodejs-simple-log
=====================

Overlay to the function console.log

## Example ##
```js
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
```
Result:
```
[2012-09-30 15:53:44] [-] Some log
[2012-09-30 15:53:44] [new Foo] Some log in constructor
[2012-09-30 15:53:44] [Foo] Some log in Foo.bar()
[2012-09-30 15:53:44] [Bar] Some log in Bar()
```
You can use other colors to distinguish logs in console.
```js
global.log = require('../lib/Log.js').log;

log('normal (gray)');
log.warn('yellow');
log.warnB('yellow background');
log.err('red');
log.errB('red background');
log.info('blue');
log.infoB('blue background');
log.ok('green');
log.okB('green background');
log.awa('magenta');
log.awaB('magenta background');
log.msg('cyan');
log.msgB('cyan background');
```
Result:

![Log in other colors](https://raw.github.com/HarasimowiczKamil/node-simple-log/master/example.png)