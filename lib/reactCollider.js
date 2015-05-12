'use strict';

var parseurl  = require('parseurl'),
    React     = require('react'),
    merge     = require('ramda').merge,
    runRouter = require('./runRouter'),
    performance = require('./performance'),
    log       = require('./log')

/**
 * Make sure we use an object
 */
var cleanData = function(data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    return data
}

var defaultOptions = {
    log: false
}

module.exports.server = function(routes, options) {
    options = merge(defaultOptions, options)

    // Server side rendering
    var returnResponse = function(res, Handler, data, perfInstance) {
        var content = React.renderToString(React.createElement(Handler, {data: cleanData(data)})),
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

        runRouter(routes, reqPath, function(Handler, data) {
            returnResponse(res, Handler, data, perfInstance)
        })
    }
}
