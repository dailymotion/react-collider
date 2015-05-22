import request from 'superagent'
import Promise from 'bluebird'
import {merge} from 'ramda'

const defaultOptions = {
    once: false,
    forceFetch: false,
    set: false
}

export default function dataProvider(component, url, options) {
    options = merge(defaultOptions, options)
    var name = component.displayName || component.name

    return new Promise(function(resolve) {
        if (!options.forceFetch && typeof initialData === 'object' && typeof initialData[name] !== 'undefined') {
            var data = initialData[name]
            if (options.once) {
                initialData[name] = undefined
            }
            resolve(data)
        }
        else {
            request('GET', url)
            .send()
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    console.error(err)
                    resolve('')
                }
                else {
                    if (options.set) {
                        initialData = initialData || {}
                        initialData[name] = res.body
                    }

                    resolve(res.body)
                }
            })
        }
    })
}
