var path = require('path')
    collider = require('react-collider').client,
    routes = require('./routing')

collider(routes, path.join(__dirname, './components'))
