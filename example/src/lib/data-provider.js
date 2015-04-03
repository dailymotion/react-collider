import request from 'superagent'
import Promise from 'bluebird'

// @todo initialData must be an object
export default function(name, url) {
    return new Promise(function(resolve) {
        if (typeof initialData !== 'undefined' && initialData !== null) {
            var data = initialData
            initialData = null
            resolve(data)
        }
        else {
            request.get(url).end(function(err, data) {
                resolve(data.text)
            })
        }
    })
}
