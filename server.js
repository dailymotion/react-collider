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
        var content = React.renderToString(React.createElement(Handler, null)),
            head = React.renderToString(React.createElement(Head, null))
        res.render(path.join(__dirname, 'index.ejs'), {content: content, head: head})
    })
})

server.listen(port, function() {
  console.log('Listening on localhost:' + port)
})
