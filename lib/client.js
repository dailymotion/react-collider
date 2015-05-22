'use strict';

var React = require('react'),
    Router = require('react-router'),
    runRouter = require('./runRouter')
    defaultOptions = {
        fetch: null
    }

// Client side rendering
var renderPage = function(Handler, data) {
    React.render(React.createElement(Handler, {data: data}), document)
}

module.exports = function(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null
    runRouter(routes, Router.HistoryLocation, fetchHandler, function(Handler, data) {
        renderPage(Handler, data)
    })
}
