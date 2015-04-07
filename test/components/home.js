var React = require('react'),
    HomeContent = require('./home-content')

var Home = React.createClass({
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, 'Homepage'),
                React.createElement(HomeContent, null)
            )
        )
    }
})

module.exports = Home
