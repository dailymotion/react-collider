'use strict';

require('node-jsx').install()

var express = require('express'),
    path    = require('path'),
    server  = express(),
    port    = process.env.PORT || 3000

require('./src/routing')

server.use(express.static(path.join(__dirname, 'public')))

var returnResponse = function(res, Handler, data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    var content = React.renderToString(React.createElement(Handler, {data: data})),
        html = '<!DOCTYPE html>' + content
    res.send(html)
}

server.get('*', function(req, res) {
    Router.run(Routes, req.url, function(Handler, state) {
        var fetchToRun = null,
            matchedHandler = null

        state.routes.forEach(function(matchedRoute) {
            if (typeof matchedRoute.handler.fetchData === 'function') {
                matchedHandler = matchedRoute.handler.displayName
                fetchToRun = require('./src/components/' + matchedRoute.handler.getModulePath()).fetchData
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
})

server.listen(port, function() {
  console.log('Listening on localhost:' + port)
})
