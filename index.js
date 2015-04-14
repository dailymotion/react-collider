'use strict';

var parseurl = require('parseurl'),
    React    = require('react'),
    Router   = require('react-router'),
    join     = require('bluebird').join

/**
 * Make sure we use an object
 */
var cleanData = function(data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    return data
}

/**
 * Run react-router then check if the matching routes need to fetch some data
 * Used for both server and client side
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {function} cb
 */
var runRouter = function(routes, routerArg, cb) {
    var routerCallback = function(Handler, state) {
        var fetches = []

        if (typeof routes.props.handler.getDependencies === 'function') {
            routes.props.handler.getDependencies().forEach(function(dep) {
                if (typeof dep.fetchData === 'function') {
                    fetches.push(dep.fetchData())
                }
            })
        }

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                fetches.push(matchedRoute.handler.fetchData())
            }
        })

        if (fetches.length) {
            fetches.push(function() {
                cb(Handler, Array.prototype.slice.call(arguments))
            })

            join.apply(null, fetches)
        }
        else {
            cb(Handler)
        }
    }

    Router.run(routes, routerArg, routerCallback)
}

// Server side rendering
var returnResponse = function(res, Handler, data) {
    var content = React.renderToString(React.createElement(Handler, {data: cleanData(data)})),
        html = '<!DOCTYPE html>' + content
    res.end(html)
}

module.exports.server = function(routes) {
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

        runRouter(routes, reqPath, function(Handler, data) {
            returnResponse(res, Handler, data)
        })
    }
}

// Client side rendering
var renderPage = function(Handler, data) {
    React.render(React.createElement(Handler, {data: cleanData(data)}), document)
}

module.exports.client = function(routes) {
    runRouter(routes, Router.HistoryLocation, function(Handler, data) {
        renderPage(Handler, data)
    })
}
