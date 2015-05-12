'use strict';

module.exports = function cleanData(data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    return data
}
