var collider = require('./../collider').client,
    Home = require('./components/home/home')
    routes = require('./routing')

collider(routes, './components')
