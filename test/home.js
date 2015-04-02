var React = require('react')

var Home = React.createClass({
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, 'Homepage')
            )
        )
    }
})

module.exports = Home
