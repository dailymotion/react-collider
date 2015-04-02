'use strict';

require('node-jsx').install()

var express = require('express'),
    path    = require('path'),
    server  = express(),
    port    = process.env.PORT || 3000,
    collider = require('../').server,
    routes = require('./src/routing')

server.use(express.static(path.join(__dirname, 'public')))
server.use(collider(routes, path.join(__dirname, './src/components')))

server.listen(port, function() {
  console.log('Listening on localhost:' + port)
})
