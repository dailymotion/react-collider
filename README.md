# React-collider [![Build Status](https://secure.travis-ci.org/dailymotion/react-collider.png)](http://travis-ci.org/dailymotion/react-collider)

Express middleware for isomorphic Express + React apps. Also usable for any [NodeJs app without Express](https://github.com/dailymotion/react-collider#usage-without-express).

Check out the `example` folder for a working example, including data-fetching from the Dailymotion API.

## Features

- Handle server and client side rendering
- First call is done server side, subsequent calls use only api
- Takes care of data fetching when needed
- Possibility to serve your app by a cdn
- Data fetching is done at the component level
- Seo ready

## Installation

    $ npm install --save react-collider

## Usage

### Server side

Simply add the server middleware in your express app, giving your routes as argument.

```javascript
import express  from 'express'
import collider from 'react-collider/server'
import routes   from './routing'

var app  = express(),
    port = process.env.PORT || 3000

app.use(collider(routes))

app.listen(port, () => {
    console.log('Listening on 127.0.0.1:' + port)
})
```

#### Logging

You can have informations in a log file:

```javascript
// logs to react-collider.log
app.use(collider(routes, {log: true}))

// logs to a custom file path
app.use(collider(routes, {log: path.join(__dirname, 'server.log')}))
```

### Client side

Similar: call the client module with your routes.

```javascript
import collider from 'react-collider/client'
import routes   from './routing'

collider(routes)
```

### Components

If your component must fetch some data before being rendered, use a `fetchData` static method. It must return a promise.

The `fetchData` method will receive an argument being the params [from the router](http://rackt.github.io/react-router/#getting-the-url-parameters).

Example of a simple component:

```javascript
export default class Home extends React.Component {
    static fetchData(params) {
        // returns a promise
        return getHomeData({userId: params.id})
    }
    render() {
        var videos = getVideoList()

        return (
            <div>
                <h1>Homepage</h1>
                {videos}
            </div>
        )
    }
}
```

When your component includes another component which needs data too, define a `getDependencies` static method to return an array of components:

```javascript
import Sidebar from './sidebar'
import Footer  from './footer'

export default class Home extends React.Component {
    static getDependencies() {
        return [Sidebar, Footer]
    }
    render() {
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
}
```

**Important:** If you're not using es6 to write your components, be sure to define the `displayName` of your components. This is necessary for the module to correctly return the data.

## Data Provider

The `dataProvider` module allows data fetching from a url or from the initial data fetched server-side.

###`dataProvider(component, url, options)`

- `component` React component. Used to store and retrieve the data in a local variable to prevent useless calls on the first page load, and for caching.
- `url` Url to call
- `options` Object. Available options:
    - `once`: Removes the data from the local variable after use. This means the next time you call the same data it will fetch them remotely. Default to false.
    - `forceFetch`: Fetches the data remotely even if the data are available locally. Default to false.
    - `set`: Sets the data locally after fetching them remotely. The next time you need them they will be taken locally (unless you use the `forceFetch` option). Default to false.

```javascript
import provider from 'react-collider/dataProvider'

class Video extends React.Component {
    static fetchData(params) {
        return provider(this, `https://api.dailymotion.com/video/${params.id}?fields=id,title`, {once: true})
    }
}
```

## Client side app only

If your servers are down and you can't pre-render the pages server-side, your app will still work client side (assuming your API is okay). All you need is to send a basic html file with your app bundled. Check out the `example` folder for an example.

## Usage without Express

You can use react-collider wihtout express. You can simply use it to get the React component to render and the data to use:

```javascript
import collider from 'react-collider'
import routes   from './routing'

var url = '/video'

// simply provide your routes and the url
collider(routes, url, (Handler, data) => {
    var page = React.renderToString(React.createElement(Handler, {data: data}))
})
```

## Custom data fetching

By default the module runs every `fetchData` methods of the components. If you need to handle yourself the data fetching you can pass a custom module that will receive an array of components needing to fetch data. It must return a promise.

You can use a custom fetch handler for server as well as client side. You can obviously choose to use a custom fetch handler server side but not client side (or the opposite), or a different one.

```javascript
var routes   = require('./routing'),
    customFetchHandler = require('./fetch-handler')

// server side
app.use(collider(routes), {fetch: customFetchHandler})

// or client side
collider(routes, {fetch: customFetchHandler})
```

```javascript
// Custom fetch handler
var Promise = require('bluebird')

module.exports = function fetchHandler(components) {
    return new Promise(function(resolve) {
        var dataSet = {}

        components.forEach(function(component) {
            // handle the data fetching the way you want
        })

        resolve(dataSet)
    })
}
```

You will be able to handle the components the way you want. Check out the [default fetch handler](https://github.com/dailymotion/react-collider/blob/master/lib/defaultFetchHandler.js) to see an example.
