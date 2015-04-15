import request from 'superagent'

export default function(name, url) {
    return new Promise(function(resolve) {
        if (typeof initialData === 'object' && typeof initialData[name] !== null) {
            var data = initialData[name]
            initialData[name] = null
            resolve(data)
        }
        else {
            request.get(url).end(function(err, data) {
                if (err) {
                    resolve('')
                }
                else {
                    resolve(data.text)
                }
            });
        }
    })
}
