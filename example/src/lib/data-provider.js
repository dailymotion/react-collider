import request from 'superagent'

export default function(name, url, once) {
    return new Promise(function(resolve) {
        if (typeof initialData === 'object' && initialData[name] !== null) {
            var data = initialData[name]
            if (once) {
                initialData[name] = null
            }
            resolve(data)
        }
        else {
            request.get(url).end(function(err, data) {
                if (err) {
                    console.error(err)
                    resolve('')
                }
                else {
                    resolve(data.text)
                }
            })
        }
    })
}
