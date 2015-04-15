'use strict';

var Router = require('react-router'),
    join   = require('bluebird').join,
    includes = require('lodash.includes')

/**
 * Run react-router then check if the matching routes need to fetch some data
 * Used for both server and client side
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {function} cb
 */
module.exports = function runRouter(routes, routerArg, cb) {
    var components = [],
        fetches    = []

    var addFetch = function addFetch(component) {
        if (typeof component.fetchData === 'function') {
            var name = component.displayName || component.name
            if (!includes(components, name)) {
                components.push(name)
                fetches.push(component.fetchData())
            }
        }
    }

    var parseDependencies = function parseDependencies(component) {
        if (typeof component.getDependencies === 'function') {
            component.getDependencies().forEach(function(dep) {
                addFetch(dep)
            })
        }
    }

    Router.run(routes, routerArg, function(Handler, state) {
        parseDependencies(routes.props.handler)

        state.routes.forEach(function(matchedRoute) {
            parseDependencies(matchedRoute.handler)
            addFetch(matchedRoute.handler)
        })

        if (fetches.length) {
            fetches.push(function() {
                var args = Array.prototype.slice.call(arguments),
                    data = {},
                    i = 0

                components.forEach(function(component) {
                    data[component] = args[i]
                    i++
                })

                cb(Handler, data)
            })

            join.apply(null, fetches)
        }
        else {
            cb(Handler)
        }
    })
}
