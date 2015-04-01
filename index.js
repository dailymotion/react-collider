'use strict';

var parseurl = require('parseurl')

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

module.exports.server = function(routingPath) {
    if (!routingPath) {
        throw new TypeError('routing path required')
    }

    if (typeof routingPath !== 'string') {
        throw new TypeError('routing path must be a string')
    }

    var routes = require(routingPath)

    return function (req, res, next) {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          return next()
        }

        var originalUrl = parseurl.original(req),
            path = parseurl(req).pathname,
            hasTrailingSlash = originalUrl.pathname[originalUrl.pathname.length - 1] === '/'

        if (path === '/' && !hasTrailingSlash) {
            path = ''
        }

        Router.run(routes, path, function(Handler, state) {
            var fetchToRun = null,
                matchedHandler = null

            state.routes.forEach(function(matchedRoute) {
                if (typeof matchedRoute.handler.fetchData === 'function') {
                    matchedHandler = matchedRoute.handler.displayName
                    fetchToRun = require(matchedRoute.handler.getModulePath()).fetchData
                }
            })

            if (typeof fetchToRun === 'function') {
                console.log('Fetching data from ' + matchedHandler)
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
    React.render(<Handler data={data} />, document)
}

module.exports.client = function(routingPath, componentsPath) {
    if (!routingPath) {
        throw new TypeError('routing path required')
    }

    if (typeof routingPath !== 'string') {
        throw new TypeError('routing path must be a string')
    }

    var routes = require(routingPath)

    Router.run(routes, Router.HistoryLocation, function(Handler, state) {
        var fetchToRun = null,
            matchedHandler = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                matchedHandler = matchedRoute.handler.displayName
                fetchToRun = require(componentsPath + '/' + matchedRoute.handler.getModulePath()).fetchData
            }
        })

        if (typeof fetchToRun === 'function') {
            console.log('Fetching data from ' + matchedHandler)
            fetchToRun().then(function(data) {
                renderPage(Handler, data)
            })
        }
        else {
            renderPage(Handler)
        }
    })
}
