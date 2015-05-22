'use strict';

var React = require('react'),
    Router = require('react-router'),
    collider = require('./reactCollider')
    defaultOptions = {
        fetch: null
    }

// Client side rendering
var renderPage = function reanderPage(Handler, data) {
    React.render(React.createElement(Handler, {data: data}), document)
}

module.exports = function client(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null
    collider(routes, Router.HistoryLocation, fetchHandler, function(Handler, data) {
        renderPage(Handler, data)
    })
}
