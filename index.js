'use strict';

var path = require('path'),
    parseurl = require('parseurl')

global.React  = require('react')
global.Router = require('react-router')
global.Link   = Router.Link

// Server side rendering
var returnResponse = function(res, Handler, data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    var content = React.renderToString(React.createElement(Handler, {data: data})),
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

        Router.run(routes, reqPath, function(Handler, state) {
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
                    returnResponse(res, Handler, data)
                })
            }
            else {
                returnResponse(res, Handler)
            }
        })
    }
}

// Client side rendering
var renderPage = function(Handler, data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    React.render(React.createElement(Handler, {data: data}), document)
}

module.exports.client = function(routes, componentsPath) {
    require('./../../src/components/home/home')
    Router.run(routes, Router.HistoryLocation, function(Handler, state) {
        var fetchToRun = null,
            matchedHandler = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                matchedHandler = matchedRoute.handler.displayName
                fetchToRun = require('./' + path.join('../../', componentsPath, matchedRoute.handler.getModulePath())).fetchData
            }
        })

        if (typeof fetchToRun === 'function') {
            fetchToRun().then(function(data) {
                renderPage(Handler, data)
            })
        }
        else {
            renderPage(Handler)
        }
    })
}
