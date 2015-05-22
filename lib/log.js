'use strict';

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(process.cwd(), 'react-collider.log')

module.exports = function log(file, type, value) {
    if (typeof file === 'string') {
        filePath = file
    }

    var message

    switch (type) {
        case 'perf':
            message = '[' + value.startTime + '] ' + value.path + ' rendered in ' + value.time + 'ms\n'
            break
    }

    fs.writeFile(filePath, message, {flag: 'a'})
}
