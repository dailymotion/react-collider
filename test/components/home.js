var React = require('react'),
    HomeContent = require('./home-content')

var Home = React.createClass({
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, 'Homepage'),
                React.createElement(HomeContent, {data: this.props.data})
            )
        )
    }
})

module.exports = Home
