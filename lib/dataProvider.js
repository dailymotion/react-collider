'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = dataProvider;

var _request = require('superagent');

var request = _interopRequire(_request);

var _Promise = require('bluebird');

var Promise = _interopRequire(_Promise);

var _merge = require('ramda');

var defaultOptions = {
    once: false,
    forceFetch: false,
    set: false
};

function dataProvider(component, url, options) {
    options = _merge.merge(defaultOptions, options);
    var name = component.displayName || component.name;

    return new Promise(function (resolve) {
        if (!options.forceFetch && typeof initialData === 'object' && typeof initialData[name] !== 'undefined') {
            var data = initialData[name];
            if (options.once) {
                initialData[name] = undefined;
            }
            resolve(data);
        } else {
            request('GET', url).send().set('Accept', 'application/json').end(function (err, res) {
                if (err) {
                    console.error(err);
                    resolve('');
                } else {
                    if (options.set) {
                        initialData = initialData || {};
                        initialData[name] = res.body;
                    }

                    resolve(res.body);
                }
            });
        }
    });
}