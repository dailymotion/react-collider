'use strict';

var React = require('react'),
    Router = require('react-router'),
    runRouter = require('./runRouter')

// Client side rendering
var renderPage = function(Handler, data) {
    React.render(React.createElement(Handler, {data: data}), document)
}

module.exports = function(routes) {
    runRouter(routes, Router.HistoryLocation, function(Handler, data) {
        renderPage(Handler, data)
    })
}
