 var util = require('util'),
 nextLogName = 'log',
 ansicodes = {
     "reset":     "\033[0m",
     "underline": "\033[4m",
     
     "black":   "\033[30m",
     "red":     "\033[31m",
     "green":   "\033[32m",
     "yellow":  "\033[33m",
     "blue":    "\033[34m",
     "magenta": "\033[35m",
     "cyan":    "\033[36m",
     "gray":    "\033[37m",
     "white":   "\033[1m",
     
     "light-black":   "\033[90m",
     "light-red":     "\033[91m",
     "light-green":   "\033[92m",
     "light-yellow":  "\033[93m",
     "light-blue":    "\033[94m",
     "light-magenta": "\033[95m",
     "light-cyan":    "\033[96m",
     "light-white":   "\033[97m",
     
     "back-black":   "\033[40m",
     "back-red":     "\033[41m",
     "back-green":   "\033[42m",
     "back-yellow":  "\033[43m",
     "back-blue":    "\033[44m",
     "back-magenta": "\033[45m",
     "back-cyan":    "\033[46m",
     "back-white":   "\033[47m",
     "back-dark":    "\033[5m",
 },
 
 /**
  * Function parse backtrase
  *
  * @param {string} line - line of stack
  * @param {string} part - what return
  *
  * @return {string}
  */
 parentFeatures = function(line, part) {
     switch (part) {
        case 'object':
            return line.match(/at (.+) \(/)[1].split('.')[0];
            break;
        case 'method':
            return line.match(/at (.+\..+) \(/)[1];
            break;
        case 'file-line-col':
            return line.match(/\((.+)\)/)[1];
            break;
        case 'file-line':
            return line.match(/\((.+):[0-9]+\)/)[1];
            break;
        case 'file':
            return line.match(/\((.+):[0-9]+:[0-9]+\)/)[1];
            break;
        case 'rel-file-line-col':
            return line.match(/\((.+)\)/)[1]
                .replace(process.argv[1].replace(/\/[^\/]+$/,''), '')
                .replace(process.cwd(), '');
            break;
        case 'rel-file-line':
            return line.match(/\((.+):[0-9]+\)/)[1]
                .replace(process.argv[1].replace(/\/[^\/]+$/,''), '')
                .replace(process.cwd(), '');
            break;
        case 'rel-file':
            return line.match(/\((.+):[0-9]+:[0-9]+\)/)[1]
                .replace(process.argv[1].replace(/\/[^\/]+$/,''), '')
                .replace(process.cwd(), '');
            break;
     }
 },
 
 /**
  *
  */
features = {
    /**
     * Feature time
     *
     * @return {string}
     */
    '{time}': function() {
        var time = new Date(),
            month = time.getMonth() < 10
                ? '0' + time.getMonth()
                : time.getMonth(),
            day = time.getDate() < 10
                ? '0' + time.getDate()
                : time.getDate(),
            hours   = time.getHours() < 10
                ? '0' + time.getHours()
                : time.getHours(),
            minutes = time.getMinutes() < 10
                ? '0' + time.getMinutes()
                : time.getMinutes(),
            seconds = time.getSeconds() < 10
                ? '0' + time.getSeconds()
                : time.getSeconds();
        return time.getFullYear() + 
        '-' + month + 
        '-' + day + 
        ' ' + hours + 
        ':' + minutes + 
        ':' + seconds;
    },
    /**
     * Feature parent - return object name
     *
     * @return {string}
     */
    '{parent}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'object'
            );
            return name === 'Object'
                ? '-'
                : name;
        }
    },
    /**
     * Feature parent - return object and method name
     *
     * @return {string}
     */
    '{parent.method}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'method'
            );
            return name === 'Object.<anonymous>'
                ? '-'
                : name;
        }
    },
    /**
     * Feature return file with path
     *
     * @return {string}
     */
    '{file}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'file'
            );
            return name;
        }
    },
    /**
     * Feature return file line and column
     *
     * @return {string}
     */
    '{file-line-col}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'file-line-col'
            );
            return name;
        }
    },
    /**
     * Feature return file and line
     *
     * @return {string}
     */
    '{file-line}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'file-line'
            );
            return name;
        }
    },
    /**
     * Feature return file path, line and column
     *
     * @return {string}
     */
    '{rel-file-line-col}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'rel-file-line-col'
            );
            return name;
        }
    },
    /**
     * Feature return file path and line
     *
     * @return {string}
     */
    '{rel-file-line}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'rel-file-line'
            );
            return name;
        }
    },
    /**
     * Feature return file path
     *
     * @return {string}
     */
    '{rel-file}': function() {
        try { capture.error } catch (e) {
            var name = parentFeatures(
                e.stack.split('\n')[5],
                'rel-file'
            );
            return name;
        }
    }
},

 /**
  * Configuration
  */
consoleConfig = {
    defaultTemplate: '[{time}] [{parent}]: {arguments}',
    
    logColor: 'reset',
    logArgColor: 'white',
    
    infoColor: 'reset',
    infoArgColor: 'light-blue',
    
    warnColor: 'reset',
    warnArgColor: 'yellow',
    
    errorColor: 'reset',
    errorArgColor: 'red',
    errorTemplate: '[{time}] [{rel-file}]: {arguments}',
    
    okColor: 'reset',
    okArgColor: 'green',
    
    msgColor: 'reset',
    msgArgColor: 'cyan',
};                     
 
/**
 * Add color codes to text
 *
 * @param {string} text
 * @param {string} color - color name
 *
 * @return {string}
 */
function addColor(text, color) {
    if (color !== 'reset') {
        return ansicodes[color] + text + ansicodes.reset;
    }
    return text;
}

/**
 * Create log line with features and colors
 *
 * @param {string} type - name of log
 * @param {mixed}  args - variables or data to print 
 * 
 * @return null
 */
function logger() {
    var args = Array.prototype.slice.call(arguments),
        type = args.shift(),
        globalColor = consoleConfig[type + 'Color'] === undefined
            ? 'reset'
            : consoleConfig[type + 'Color'],
        argsColor = consoleConfig[type + 'ArgColor'] === undefined
            ? globalColor
            : consoleConfig[type + 'ArgColor'] 
        formatedArgs = util.format.apply(this, args),
        argRegexp = new RegExp('{arguments}', 'g'),
        template = consoleConfig[type + 'Template'] === undefined
            ? consoleConfig.defaultTemplate
            : consoleConfig[type + 'Template'],
        regexp = new RegExp('(' + Object.keys(features).join('|') + ')', 'g'),
        matches = template.match(regexp);
    
    for (var i = 0; i < matches.length; ++i) {
        regexp = new RegExp(matches[i], 'g');
        template = template.replace(regexp, features[matches[i]]());
    }
    
    if (argRegexp.test(template)) {
        template = template.replace(argRegexp, addColor(formatedArgs, argsColor));
    } else {
        template += addColor(
            formatedArgs,
            argsColor
        );
    }
    
    process.stdout.write(addColor(template, globalColor) + '\n');
};


/**
 * Configure
 * 
 * @param {object|string} arguments[0] - config object or name
 * @param {mixed}         arguments[1] - value
 *
 * @return {mixed}
 */
function config() {
    if (arguments.length === 0) {
        return consoleConfig;
    }
    if (arguments.length === 1) {
        if (typeof arguments[0] === 'string') {
            return consoleConfig[arguments[0]];
        }
        if (typeof arguments[0] === 'object') {
            return consoleConfig = arguments[1];
        }
    }
    if (arguments.length === 2) {
        if (typeof arguments[0] !== 'string') {
            throw new BadArgumentError('BadArgument', 'First param must be type of "string"');
        }
        return consoleConfig[arguments[0]] = arguments[1];
    }
};

/**
 * Set custom name for next log execute
 *
 * @param {string} name 
 */
function name(name) {
    nextLogName = name;
    return this;
};

/**
 * Returned methods
 */
module.exports = {
    log: function() {
        this.run(null, arguments);
    },
    info: function() {
        this.run('info', arguments);
    },
    warn: function() {
        this.run('warn', arguments);
    },
    error: function() {
        this.run('error', arguments);
    },
    dir: console.dir,
    time: console.time,
    timeEnd: console.timeEnd,
    trace: console.trace,
    assert: console.assert,
    
    name: name,
    config: config,
    ok: function() {
        this.run('ok', arguments);
    },
    msg: function() {
        this.run('msg', arguments);
    },
    run: function(name, arguments) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(name ? name : nextLogName);
        logger.apply(this, args);
        this.name('log');
    }
};

/**
 * Exception object
 */
function BadArgumentError(name, message) {
    this.name = name;
    this.message = message;
}
BadArgumentError.prototype.name = '';
BadArgumentError.prototype.message = '';