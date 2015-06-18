import Router from 'react-router'
import {contains} from 'ramda'
import defaultFetchHandler from './defaultFetchHandler'

/**
 * Run react-router then check if the matching routes need to fetch some data
 * Used for both server and client side
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {mixed} fetchHandler - custom fetch handler
 * @param {function} cb
 */
export default function reactCollider(routes, routerArg, fetchHandler, cb) {
    fetchHandler = typeof fetchHandler === 'function' ? fetchHandler : defaultFetchHandler
    var components = [],
        params     = {}

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
                parseDependencies(dep)
                addComponent(dep)
            })
        }
    }

    Router.run(routes, routerArg, function(Handler, state) {
        parseDependencies(routes.props.handler)
        params = state.params

        state.routes.forEach(function(matchedRoute) {
            parseDependencies(matchedRoute.handler)
            addComponent(matchedRoute.handler)
        })

        if (components.length) {
            fetchHandler(components, params).then(function(data) {
                components = []
                cb(Handler, data, state)
            })
        }
        else {
            components = []
            cb(Handler, {}, state)
        }
    })
}
