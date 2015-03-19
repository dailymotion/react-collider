'use strict';

require('node-jsx').install()

var express = require('express'),
    path    = require('path'),
    server  = express(),
    port    = process.env.PORT || 3000,
    bootstrap = require('./src/bootstrap')

server.use(express.static(path.join(__dirname, 'public')))
server.set('view engine', 'ejs')

server.get('*', function(req, res) {
    Router.run(Routes, req.url, function(Handler) {
        var Home = require('./src/home/home')
        Home.fetchData().end(function(err, data) {
            var content = React.renderToString(React.createElement(Handler, {data: data.text})),
                head = React.renderToString(React.createElement(Head, null)),
                html = '<!DOCTYPE html>' + content
            res.send(html)
        })
    })
})

server.listen(port, function() {
  console.log('Listening on localhost:' + port)
})
