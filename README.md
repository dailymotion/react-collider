# React-collider

Express middleware for isomorphic express + react apps.

Check out the `daily-collider` branch for a working example, including data-fetching from the Dailymotion API.

## Installation

    $ npm install --save react-collider

## Usage

### Server side

Simply add the server middleware in your express app, giving your routes and the path to the components.

```javascript
var express  = require('express'),
    path     = require('path'),
    app      = express(),
    port     = process.env.PORT || 3000,
    collider = require('./collider').server

server.use(collider(path.join(__dirname, 'src/routing')))

server.listen(port, function() {
  console.log('Listening on 127.0.0.1:' + port)
})
```

### Client side

Similar: call the client module with your routes and the components' path.

```javascript
var path = require('path'),
    collider = require('./../collider').client,
    routes = require('./routing')

collider(routes, path.join(__dirname, './components'))
```
