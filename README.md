nodejs-simple-log
=====================

Overlay to the function console.log

## Install ##
```
npm install node-simple-log
```

## API ##
### config() ###
Set templates and colors `simple.config(key, value);` 

```js
var simple = require('node-simple-log');
simple.config('defaultTemplate', '[{time}] [{parent}]: {arguments}');
simple.config('errorTemplate', '[{time}] [{rel-file}]: {arguments}');
simple.config('myLogTemplate', '{time} {ref-file-line} | {arguments}');
```

#### Templates ####
Posible features:
* `{time}` complete data like `2013-04-20 11:00:26`
* `{parent}` object name
* `{parent.method}` object and method
* `{file}` file with path
* `{file-line-col}` file with path, line and column 
* `{file-line}` file with path and line number
* `{rel-file-line-col}` file with path (without `process.cwd()` and `process.argv[1]`), line and column
* `{rel-file-line}` file with path (without `process.cwd()` and `process.argv[1]`) and line
* `{rel-file}` file with path (without `process.cwd()` and `process.argv[1]`)
* `{arguments}` if not set arguments are add on end line

#### Colors ####
Posible colors and decorations:
* `reset`
* `underline`
* `black`
* `red`
* `green`
* `yellow`
* `blue`
* `magenta`
* `cyan`
* `gray`
* `white`
* `light-black`
* `light-red`
* `light-green`
* `light-yellow`
* `light-blue`
* `light-magenta`
* `light-cyan`
* `light-white`
* `back-black`
* `back-red`
* `back-green`
* `back-yellow`
* `back-blue`
* `back-magenta`
* `back-cyan`
* `back-white`
* `back-dark`

### name() ###
Set name log to next context when use log

```js
var simple = require('node-simple-log');

// Set config to your own log type
simple.config('myLogTemplate', '{time} {ref-file-line} | {arguments}');
simple.config('myLogColor', 'light-red');
simple.config('myLogArgColor', 'underline');
// set context and print log
simple.name('myLog').log('my custom log');
```

### Standard print methods: ###

```js
var simple = require('node-simple-log');

simple.log('my log', simple);
simple.info('my info');
simple.warn('my warn');
simple.error('my error');
simple.ok('my green log');
simple.msg('my msg');
```

You can add your log type to global object:

```js
var simple = require('node-simple-log');
simple.myLog = function() {
    this.run('myLog', arguments);
}
```


## Example ##
```js
var simple = require('node-simple-log');

simple.log('Some', 'log');

function Foo() {
    simple.log('Some', 'log', 'in', 'constructor');
}
Foo.prototype.bar = function() {
    simple.log('Some', 'log', 'in', 'Foo.bar()');
}

function Bar() {
    simple.log('Some', 'log', 'in', 'Bar()');
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

See more in example directory

![Log in other colors](https://raw.github.com/HarasimowiczKamil/node-simple-log/master/example.png)