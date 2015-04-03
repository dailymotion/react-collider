'use strict';

var path = require('path'),
    parseurl = require('parseurl'),
    React  = require('react'),
    Router = require('react-router')

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
 */
var runRouter = function() {
    var args = Array.prototype.slice.call(arguments),
        componentsPath = args[0],
        routerArgs = args.splice(1, args.length - 2),
        cb = args[args.length -1]

    var routerCallback = function(Handler, state) {
        var fetchToRun = null,
            matchedHandler = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                matchedHandler = matchedRoute.handler.displayName
                fetchToRun = require(path.join(componentsPath, matchedRoute.handler.getModulePath())).fetchData
            }
        })

        if (typeof fetchToRun === 'function') {
            fetchToRun().then(function(data) {
                cb(Handler, data)
            })
        }
        else {
            cb(Handler)
        }
    }

    routerArgs.push(routerCallback)

    Router.run.apply(null, routerArgs)
}

// Server side rendering
var returnResponse = function(res, Handler, data) {
    var content = React.renderToString(React.createElement(Handler, {data: cleanData(data)})),
        html = '<!DOCTYPE html>' + content
    res.end(html)
}

module.exports.server = function(routes, componentsPath) {
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

        runRouter(componentsPath, routes, reqPath, function(Handler, data) {
            returnResponse(res, Handler, data)
        })
    }
}

// Client side rendering
var renderPage = function(Handler, data) {
    React.render(React.createElement(Handler, {data: cleanData(data)}), document)
}

module.exports.client = function(routes, componentsPath) {
    runRouter(componentsPath, routes, Router.HistoryLocation, function(Handler, data) {
        renderPage(Handler, data)
    })
}
