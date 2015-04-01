'use strict';

var path = require('path'),
    parseurl = require('parseurl')

global.React  = require('react')
global.Router = require('react-router')
global.Link   = Router.Link

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
 * @param {array} routerArgs - Arguments to pass to the router
 * @param {function} cb - Callback
 */
var runRouter = function(routerArgs, cb) {
    Router.run.apply(routerArgs, function(Handler, states) {
        var fetchToRun = null,
            matchedHandler = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                matchedHandler = matchedRoute.handler.displayName
                fetchToRun = require('./' + path.join('../../', componentsPath, matchedRoute.handler.getModulePath())).fetchData
            }
        })

        fetchToRun().then(function(data) {
            cb(Handler, data)
        })
    })
}

// Server side rendering
var returnResponse = function(res, Handler, data) {
    var content = React.renderToString(React.createElement(Handler, {data: cleanData(data)})),
        html = '<!DOCTYPE html>' + content
    res.send(html)
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

        runRouter([routes, reqPath], function(Handler, data) {
            returnResponse(res, Handler, data)
        })
    }
}

// Client side rendering
var renderPage = function(Handler, data) {
    React.render(React.createElement(Handler, {data: cleanData(data)}), document)
}

module.exports.client = function(routes, componentsPath) {
    runRouter([routes, Router.HistoryLocation], function(Handler, data) {
        renderPage(Handler, data)
    })
}
