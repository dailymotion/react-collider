'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = defaultFetchHandler;

var _Promise = require('bluebird');

var Promise = _interopRequire(_Promise);

var _contains = require('ramda');

function defaultFetchHandler(components, params) {
    return new Promise(function (resolve) {
        var componentsName = [],
            fetches = [];

        components.forEach(function (component) {
            if (typeof component.fetchData === 'function') {
                var displayName = component.displayName || component.name,
                    name = typeof component.expose === 'function' ? component.expose(params) : displayName;
                if (!_contains.contains(name)(components)) {
                    componentsName.push(name);
                    fetches.push(component.fetchData(params));
                }
            }
        });

        if (fetches.length) {
            fetches.push(function () {
                var args = Array.prototype.slice.call(arguments),
                    data = {},
                    i = 0;

                componentsName.forEach(function (component) {
                    data[component] = args[i];
                    i++;
                });

                resolve(data);
            });

            Promise.join.apply(null, fetches);
        } else {
            resolve({});
        }
    });
}