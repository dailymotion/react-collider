'use strict';

var Router = require('react-router'),
    contains = require('ramda').contains,
    defaultFetchHandler = require('./defaultFetchHandler')

/**
 * Run react-router then check if the matching routes need to fetch some data
 * Used for both server and client side
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {mixed} fetchHandler - custom fetch handler
 * @param {function} cb
 */
module.exports = function runRouter(routes, routerArg, fetchHandler, cb) {
    fetchHandler = typeof fetchHandler === 'function' ? fetchHandler : defaultFetchHandler

    var components = []

    var addComponent = function addComponent(component) {
        if (typeof component.fetchData === 'function') {
            if (!contains(component)(components)) {
                components.push(component)
            }
        }
    }

    var parseDependencies = function parseDependencies(component) {
        if (typeof component.getDependencies === 'function') {
            component.getDependencies().forEach(function(dep) {
                addComponent(dep)
            })
        }
    }

    Router.run(routes, routerArg, function(Handler, state) {
        parseDependencies(routes.props.handler)

        state.routes.forEach(function(matchedRoute) {
            parseDependencies(matchedRoute.handler)
            addComponent(matchedRoute.handler)
        })

        if (components.length) {
            fetchHandler(components).then(function(data) {
                cb(Handler, data)
            })
        }
        else {
            components = []
            cb(Handler)
        }
    })
}
