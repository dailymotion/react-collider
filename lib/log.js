'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = log;

var _fs = require('fs');

var fs = _interopRequire(_fs);

var _path = require('path');

var path = _interopRequire(_path);

var filePath = path.join(process.cwd(), 'react-collider.log');

function log(file, type, value) {
    if (typeof file === 'string') {
        filePath = file;
    }

    var message;

    switch (type) {
        case 'perf':
            message = '[' + value.startTime + '] ' + value.path + ' rendered in ' + value.time + ' ms\n';
            break;
    }

    fs.writeFile(filePath, message, { flag: 'a' });
}