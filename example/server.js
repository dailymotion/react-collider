import nodejsx from 'node-jsx'

nodejsx.install()

import express from 'express'
import path    from 'path'
import {server as collider} from 'react-collider'
import routes from './src/routing'

var server = express(),
    port = process.env.PORT || 3000

server.use(express.static(path.join(__dirname, 'public')))
server.use(collider(routes))

server.listen(port, function() {
    console.log('Listening on localhost:' + port)
})
