'use strict';

var Promise = require('bluebird'),
    join   = require('bluebird').join,
    contains = require('ramda').contains

module.exports = function defaultFetchHandler(components) {
    return new Promise(function(resolve) {
        var componentsName = [],
            fetches = []

        components.forEach(function(component) {
            if (typeof component.fetchData === 'function') {
                var name = component.displayName || component.name
                if (!contains(name)(components)) {
                    componentsName.push(name)
                    fetches.push(component.fetchData())
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

            join.apply(null, fetches)
        }
    })
}
