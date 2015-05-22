'use strict';

var parseurl  = require('parseurl'),
    React     = require('react'),
    Router    = require('react-router'),
    merge     = require('ramda').merge,
    collider  = require('./reactCollider'),
    performance = require('./performance'),
    log       = require('./log')

var defaultOptions = {
    log: false,
    fetch: null
}

module.exports = function server(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null

    // Server side rendering
    var returnResponse = function(res, Handler, data, perfInstance) {
        var content = React.renderToString(React.createElement(Handler, {data: data})),
            html = '<!DOCTYPE html>' + content
        options.log && log(options.log, 'perf', perfInstance())
        res.end(html)
    }

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

        var perfInstance = performance(reqPath)

        collider(routes, reqPath, fetchHandler, function(Handler, data) {
            returnResponse(res, Handler, data, perfInstance)
        })
    }
}
