'use strict';

var Promise = require('bluebird'),
    contains = require('ramda').contains

module.exports = function defaultFetchHandler(components, params) {
    return new Promise(function(resolve) {
        var componentsName = [],
            fetches = []

        components.forEach(function(component) {
            if (typeof component.fetchData === 'function') {
                var name = component.displayName || component.name
                if (!contains(name)(components)) {
                    componentsName.push(name)
                    fetches.push(component.fetchData(params))
                }
            }
        })

        if (fetches.length) {
            fetches.push(function() {
                var args = Array.prototype.slice.call(arguments),
                    data = {},
                    i = 0

                componentsName.forEach(function(component) {
                    data[component] = args[i]
                    i++
                })

                resolve(data)
            })

            Promise.join.apply(null, fetches)
        }
        else {
            resolve({})
        }
    })
}
