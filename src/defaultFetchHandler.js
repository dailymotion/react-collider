import Promise from 'bluebird'
import {contains} from 'ramda'
import provider from './dataProvider'

export default function defaultFetchHandler(components, params) {
    return new Promise(function(resolve) {
        var componentsName = [],
            fetches = []

        components.forEach(function(component) {
            if (typeof component.fetchData === 'function') {
                var componentFetches = component.fetchData(params)
                if (!Array.isArray(componentFetches)) {
                    componentFetches = [componentFetches]
                }

                componentFetches.forEach(function(fetch) {
                    componentsName.push(fetch.expose)
                    let params = typeof fetch.params === 'object' ? fetch.params : {}
                    fetches.push(provider(fetch.expose, fetch.url, params))
                })
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
