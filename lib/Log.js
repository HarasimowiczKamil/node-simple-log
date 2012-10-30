exports.log = function() {
    var args = Array.prototype.slice.call(arguments);
    // Add parent
    try { capture.error } catch (e) {
        var parentName = e.stack.split('\n')[2].match(/at (.+) \(/)[1].split('.')[0];
        args.unshift('[' + (parentName == 'Object' ? '-' : parentName) + ']');
    }
    // Add time
    var time = new Date();
    var month   = time.getMonth()   < 10 ? '0' + time.getMonth()   : time.getMonth();
    var day     = time.getDate()    < 10 ? '0' + time.getDate()    : time.getDate();
    var hours   = time.getHours()   < 10 ? '0' + time.getHours()   : time.getHours();
    var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    args.unshift('[' + time.getFullYear() + 
        '-' + month + 
        '-' + day + 
        ' ' + hours + 
        ':' + minutes + 
        ':' + seconds + ']');
    console.log.apply(this, args);
};