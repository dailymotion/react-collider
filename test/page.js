var React = require('react')

var Page = React.createClass({
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, 'Other Page')
            )
        )
    }
})

module.exports = Page
