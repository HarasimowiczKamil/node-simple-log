 function preparearguments(data, colorANSI) {
     var args = Array.prototype.slice.call(data);
    // Add parent
    try { capture.error } catch (e) {
        var parentName = e.stack.split('\n')[3].match(/at (.+) \(/)[1].split('.')[0];
        args.unshift('[' + (parentName == 'Object' ? '-' : parentName) + ']');
    }
    // Add time
    var time = new Date();
    var month   = time.getMonth()   < 10 ? '0' + time.getMonth()   : time.getMonth();
    var day     = time.getDate()    < 10 ? '0' + time.getDate()    : time.getDate();
    var hours   = time.getHours()   < 10 ? '0' + time.getHours()   : time.getHours();
    var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    args.unshift(
        (colorANSI ? colorANSI : '') +
        '[' + time.getFullYear() + 
        '-' + month + 
        '-' + day + 
        ' ' + hours + 
        ':' + minutes + 
        ':' + seconds + ']');
    
    if (colorANSI) {
        args.push('\033[0m'); // reset code
    }
    return args;
 }
 
 
var Log = function() {
    var args = preparearguments(arguments);
    console.log.apply(this, args);
};

Log.warn = function() {
    var args = preparearguments(arguments, '\033[33m'); // yellow
    console.log.apply(this, args);
};
Log.warnB = function() {
    var args = preparearguments(arguments, '\033[43m'); // yellow
    console.log.apply(this, args);
};

Log.err = function() {
    var args = preparearguments(arguments, '\033[31m'); // red
    console.log.apply(this, args);
};
Log.errB = function() {
    var args = preparearguments(arguments, '\033[41m'); // red
    console.log.apply(this, args);
};

Log.info = function() {
    var args = preparearguments(arguments, '\033[34m'); // blue
    console.log.apply(this, args);
};
Log.infoB = function() {
    var args = preparearguments(arguments, '\033[44m'); // blue
    console.log.apply(this, args);
};

Log.ok = function() {
    var args = preparearguments(arguments, '\033[32m'); // green
    console.log.apply(this, args);
};
Log.okB = function() {
    var args = preparearguments(arguments, '\033[42m'); // green
    console.log.apply(this, args);
};

Log.awa = function() {
    var args = preparearguments(arguments, '\033[35m'); // magenta
    console.log.apply(this, args);
};
Log.awaB = function() {
    var args = preparearguments(arguments, '\033[45m'); // magenta
    console.log.apply(this, args);
};

Log.msg = function() {
    var args = preparearguments(arguments, '\033[36m'); // cyan
    console.log.apply(this, args);
};
Log.msgB = function() {
    var args = preparearguments(arguments, '\033[46m'); // cyan
    console.log.apply(this, args);
};


exports.log = Log;