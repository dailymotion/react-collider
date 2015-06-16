var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    Home = require('./components/home'),
    Page = require('./components/page'),
    Video = require('./components/video'),
    User = require('./components/user'),
    Sidebar = require('./components/sidebar')

var App = React.createClass({
    statics: {
        getDependencies: function() {
            return [Sidebar]
        }
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement(Sidebar, {data: this.props.data}),
                React.createElement(RouteHandler, {data: this.props.data})
            )
        )
    }
})

var routes = (
    React.createElement(Route, {handler: App, path: '/'},
        React.createElement(Route, {name: 'home', handler: Home, path: '/'}),
        React.createElement(Route, {name: 'page', handler: Page, path: '/page'}),
        React.createElement(Route, {name: 'video', handler: Video, path: '/video'}),
        React.createElement(Route, {name: 'user', handler: User, path: '/user/:id'})
    )
)

module.exports = routes
