'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

module.exports = client;

var _React = require('react');

var React = _interopRequire(_React);

var _Router = require('react-router');

var Router = _interopRequire(_Router);

var _collider = require('./reactCollider');

var collider = _interopRequire(_collider);

var _merge = require('ramda');

var defaultOptions = {
    fetch: null
};

// Client side rendering
var renderPage = function reanderPage(Handler, data) {
    React.render(React.createElement(Handler, { data: data }), document);
};

function client(routes, options) {
    options = _merge.merge(defaultOptions, options);

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null;
    collider(routes, Router.HistoryLocation, fetchHandler, function (Handler, data) {
        renderPage(Handler, data);
    });
}