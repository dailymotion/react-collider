import request from 'superagent'
import Promise from 'bluebird'
import {merge} from 'ramda'

const defaultOptions = {
    once: true,
    forceFetch: false,
    set: false
}

export default function dataProvider(expose, url, options) {
    options = merge(defaultOptions, options)

    return new Promise(function(resolve) {
        if (!options.forceFetch && typeof initialData === 'object' && typeof initialData[expose] !== 'undefined') {
            var data = initialData[expose]
            if (options.once) {
                initialData[expose] = undefined
            }
            resolve(data)
        }
        else {
            request('GET', url)
            .timeout(2000)
            .send()
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    if (err.timeout) {
                        resolve({
                            error: {
                                code: 'timeout',
                                message: `This request has timed-out: ${url}`,
                                type: 'timeout'
                            }
                        })
                    }
                    else {
                        resolve(err.response.body)
                    }
                }
                else {
                    if (options.set) {
                        initialData = initialData || {}
                        initialData[expose] = res.body
                    }

                    resolve(res.body)
                }
            })
        }
    })
}
