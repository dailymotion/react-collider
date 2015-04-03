# React-collider

Express middleware for isomorphic Express + React apps.

Check out the `example` folder for a working example, including data-fetching from the Dailymotion API.

## Installation

    $ npm install --save react-collider

## Usage

### Server side

Simply add the server middleware in your express app, giving your routes as argument.

```javascript
var express  = require('express'),
    app      = express(),
    port     = process.env.PORT || 3000,
    collider = require('./collider').server,
    routes   = require('./routing')

app.use(collider(routes))

app.listen(port, function() {
  console.log('Listening on 127.0.0.1:' + port)
})
```

### Client side

Similar: call the client module with your routes.

```javascript
var collider = require('./../collider').client,
    routes   = require('./routing')

collider(routes)
```

### Components

Your components must have a mandatory `getModulePath` static method, which must return a string giving the path to the module, relative to the component path.

If your component must fetch some data before being rendered, use a `fetchData` static method. It must return a promise.

Example of a simple component:

```javascript
var Home = React.createClass({
    statics: {
        getModulePath: function() {
            return 'home/home'
        },
        fetchData: function() {
            // returns a promise
            return getHomeData()
        }
    },
    render: function() {
        var videos = getVideoList()

        return (
            <div>
                <h1>Homepage</h1>
                {videos}
            </div>
        )
    }
})
```
