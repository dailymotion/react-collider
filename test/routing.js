var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    Home = require('./components/home'),
    Page = require('./components/page'),
    Video = require('./components/video')

var App = React.createClass({
    getData: function() {
        return this.props.data || {}
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement(RouteHandler, {data: this.getData()})
            )
        )
    }
})

var routes = (
    React.createElement(Route, {handler: App, path: '/'},
        React.createElement(Route, {name: 'home', handler: Home, path: '/'}),
        React.createElement(Route, {name: 'page', handler: Page, path: '/page'}),
        React.createElement(Route, {name: 'video', handler: Video, path: '/video'})
    )
)

module.exports = routes