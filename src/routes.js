require('./deps')

// Require your pages
var Home  = require('./home/home'),
    Video = require('./video/video')

// Define the default route
var defaultRoute = Home

// Define your routes
var routes = [
    {
        path: '/',
        name: 'home',
        handler: Home
    },
    {
        path: '/video',
        name: 'video',
        handler: Video
    },
]

// Do not touch
module.exports = {
    defaultRoute: defaultRoute,
    routes: routes
}
