import React from 'react'
import {default as Router, Route, DefaultRoute} from 'react-router'
import Html from './components/layout/html'

// Import your pages
import Home from './components/home/home'
import Video from './components/video/video'

// Declare your routes
var routes = (
    <Route handler={Html} path="/">
        <DefaultRoute handler={Home} />
        <Route name="home" handler={Home} path="/" />
        <Route name="video" handler={Video} path="/video/:id" />
    </Route>
)

export default routes
