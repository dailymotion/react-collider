'use strict';

var parseurl  = require('parseurl'),
    React     = require('react'),
    Router    = require('react-router'),
    merge     = require('ramda').merge,
    runRouter = require('./runRouter')

/**
 * Make sure we use an object
 */
var cleanData = function(data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    return data
}

// Server side rendering
var returnResponse = function(res, Handler, data) {
    var content = React.renderToString(React.createElement(Handler, {data: cleanData(data)})),
        html = '<!DOCTYPE html>' + content
    res.end(html)
}

var defaultOptions = {
    fetch: null
}

module.exports.server = function(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null

    return function (req, res, next) {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          return next()
        }

        var originalUrl = parseurl.original(req),
            reqPath = parseurl(req).pathname,
            hasTrailingSlash = originalUrl.pathname[originalUrl.pathname.length - 1] === '/'

        if (reqPath === '/' && !hasTrailingSlash) {
            reqPath = ''
        }

        runRouter(routes, reqPath, fetchHandler, function(Handler, data) {
            returnResponse(res, Handler, data)
        })
    }
}

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

module.exports.client = function(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null

    runRouter(routes, Router.HistoryLocation, fetchHandler, function(Handler, data) {
        renderPage(Handler, data)
    })
}
