require('node-jsx').install({extension:'.jsx'})
path    = require 'path'
express = require 'express'
React   = require 'react'
Router  = require 'react-router'
Route   = require('react-router').Route
DefaultRoute = require('react-router').DefaultRoute
app     = express()

App    = require './public/js/page.jsx'
Video  = require './public/video/video-item/video.jsx'
Videos = require './public/video/video-list/videos.jsx'
Player = require './public/video/player/player.jsx'

app.use express.static(path.join(__dirname, 'public'))
app.set 'view engine', 'ejs'

# Server
routes = (
    React.createElement(Route, {"handler": (App.App), "path": "{path}"},
        React.createElement(DefaultRoute, {"handler": (App.Home)}),
        React.createElement(Route, {"path": "/", "name": "home", "handler": (App.Home)}),
        React.createElement(Route, {"path": "/videos", "name": "videos", "handler": (Videos)}),
        React.createElement(Route, {"path": "/video", "name": "video", "handler": (Video)})
    )
)

app.get '*', (req, res) ->
    Router.run routes, req.url, (Handler) ->
        content = React.renderToString React.createElement(Handler, null)
        head = React.renderToString React.createElement(App.Head, null)
        res.render 'index', {content: content, head: head}

module.exports = app
