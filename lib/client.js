'use strict';

var React = require('react'),
    Router = require('react-router'),
    runRouter = require('./runRouter'),
    cleanData = require('./cleanData')

// Client side rendering
var renderPage = function(Handler, data) {
    try {
        React.render(React.createElement(Handler, {data: cleanData(data)}), document)
    }
    catch(e) {
        React.render(React.createElement(Handler, {data: cleanData(data)}), document.body)
        console.warn('Automatically switched to client side app', e)
    }
}

module.exports = function(routes) {
    runRouter(routes, Router.HistoryLocation, function(Handler, data) {
        renderPage(Handler, data)
    })
}
