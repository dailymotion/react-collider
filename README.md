# React-collider

Express middleware for isomorphic Express + React apps.

Check out the `example` folder for a working example, including data-fetching from the Dailymotion API.

## Installation

    $ npm install --save react-collider

## Features

- Handle server and client side rendering
- Takes care of data fetching when needed

## Usage

### Server side

Simply add the server middleware in your express app, giving your routes as argument.

```javascript
var express  = require('express'),
    app      = express(),
    port     = process.env.PORT || 3000,
    collider = require('react-collider').server,
    routes   = require('./routing')

app.use(collider(routes))

app.listen(port, function() {
  console.log('Listening on 127.0.0.1:' + port)
})
```

### Client side

Similar: call the client module with your routes.

```javascript
var collider = require('react-collider').client,
    routes   = require('./routing')

collider(routes)
```

### Components

If your component must fetch some data before being rendered, use a `fetchData` static method. It must return a promise.

Example of a simple component:

```javascript
var Home = React.createClass({
    displayName: 'Home',
    statics: {
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

When your component includes another component which needs data too, define a `getDependencies` static method to return an array of components:

```javascript
var Sidebar = require('./sidebar'),
    Footer  = require('./footer')

var Home = React.createClass({
    displayName: 'Home',
    statics: {
        getDependencies: function() {
            return [Sidebar, Footer]
        }
    },
    render: function() {
        return (
            <div>
                <Sidebar data={this.props.data.Sidebar} />
                <div>
                    <h1>Homepage</h1>
                </div>
                <Footer data={this.props.data.Footer} />
            </div>
        )
    }
})
```

**Important** If you're not using es6 to write your components, be sure to define the `displayName` of your components. This is necessary for the module to correctly return the data.
