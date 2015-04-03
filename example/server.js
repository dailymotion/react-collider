'use strict';

require('node-jsx').install()

var express = require('express'),
    path    = require('path'),
    server  = express(),
    port    = process.env.PORT || 3000,
    routes  = require('./src/routing'),
    collider = require('react-collider').server

server.use(express.static(path.join(__dirname, 'public')))
server.use(collider(routes))

server.listen(port, function() {
  console.log('Listening on localhost:' + port)
})
