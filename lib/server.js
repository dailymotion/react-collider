'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = server;

var _React = require('react');

var React = _interopRequire(_React);

var _Router = require('react-router');

var Router = _interopRequire(_Router);

var _merge = require('ramda');

var _collider = require('./reactCollider');

var collider = _interopRequire(_collider);

var _performance = require('./performance');

var performance = _interopRequire(_performance);

var _log = require('./log');

var log = _interopRequire(_log);

var defaultOptions = {
    log: false,
    fetch: null
};

function server(routes, options) {
    options = _merge.merge(defaultOptions, options);

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null;

    // Server side rendering
    var returnResponse = function returnResponse(res, Handler, data, perfInstance) {
        var content = React.renderToString(React.createElement(Handler, { data: data })),
            html = '<!DOCTYPE html>' + content;
        options.log && log(options.log, 'perf', perfInstance());
        res.end(html);
    };

    return function (req, res, next) {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }

        var perfInstance = performance(req.url);

        collider(routes, req.url, fetchHandler, function (Handler, data) {
            returnResponse(res, Handler, data, perfInstance);
        });
    };
}