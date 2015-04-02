var path = require('path')
    collider = require('../../').client,
    routes = require('./routing')

collider(routes, path.join(__dirname, './components'))
