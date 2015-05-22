import fs from 'fs'
import path from 'path'

var filePath = path.join(process.cwd(), 'react-collider.log')

export default function log(file, type, value) {
    if (typeof file === 'string') {
        filePath = file
    }

    var message

    switch (type) {
        case 'perf':
            message = `[${value.startTime}] ${value.path} rendered in ${value.time} ms\n`
            break
    }

    fs.writeFile(filePath, message, {flag: 'a'})
}
