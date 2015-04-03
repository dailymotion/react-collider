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
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {function} cb
 */
var runRouter = function(routes, routerArg, cb) {
    var routerCallback = function(Handler, state) {
        var fetchToRun = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                fetchToRun = matchedRoute.handler.fetchData
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
