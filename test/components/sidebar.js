var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var Sidebar = React.createClass({
    statics: {
        fetchData: function(params) {
            return [
                {
                    expose: 'sidebar-users',
                    url: 'https://api.dailymotion.com/users?fields=username&ids=x1d6bdd'
                },
                {
                    expose: 'sidebar-channels',
                    url: 'https://api.dailymotion.com/channels'
                }
            ]
        }
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('div', null, this.props.data['sidebar-users'].list[0].username)
            )
        )
    }
})

module.exports = Sidebar
