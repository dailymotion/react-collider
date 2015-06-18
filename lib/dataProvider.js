'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = dataProvider;

var _request = require('superagent');

var request = _interopRequire(_request);

var _Promise = require('bluebird');

var Promise = _interopRequire(_Promise);

var _merge = require('ramda');

var defaultOptions = {
    once: true,
    forceFetch: false,
    set: false
};

function dataProvider(expose, url, options) {
    options = _merge.merge(defaultOptions, options);

    return new Promise(function (resolve) {
        if (!options.forceFetch && typeof initialData === 'object' && typeof initialData[expose] !== 'undefined') {
            var data = initialData[expose];
            if (options.once) {
                initialData[expose] = undefined;
            }
            resolve(data);
        } else {
            request('GET', url).timeout(2000).send().set('Accept', 'application/json').end(function (err, res) {
                if (err) {
                    if (err.timeout) {
                        resolve({
                            error: {
                                code: 'timeout',
                                message: 'This request has timed-out: ' + url,
                                type: 'timeout'
                            }
                        });
                    } else {
                        resolve(err.response.body.error);
                    }
                } else {
                    if (options.set) {
                        initialData = initialData || {};
                        initialData[expose] = res.body;
                    }

                    resolve(res.body);
                }
            });
        }
    });
}