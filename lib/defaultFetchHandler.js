'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = defaultFetchHandler;

var _Promise = require('bluebird');

var Promise = _interopRequire(_Promise);

var _contains = require('ramda');

var _provider = require('./dataProvider');

var provider = _interopRequire(_provider);

function defaultFetchHandler(components, params) {
    return new Promise(function (resolve) {
        var componentsName = [],
            fetches = [];

        components.forEach(function (component) {
            if (typeof component.fetchData === 'function') {
                var componentFetches = component.fetchData(params);
                if (!Array.isArray(componentFetches)) {
                    componentFetches = [componentFetches];
                }

                componentFetches.forEach(function (fetch) {
                    componentsName.push(fetch.expose);
                    var params = typeof fetch.params === 'object' ? fetch.params : {};
                    fetches.push(provider(fetch.expose, fetch.url, params));
                });
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