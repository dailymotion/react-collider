var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var User = React.createClass({
    displayName: 'User',
    statics: {
        fetchData: function(params) {
            return {
                expose: 'user',
                url: 'https://api.dailymotion.com/user/romainberger?fields=username'
            }
        }
    },
    render: function() {
        return (
            React.createElement('div', null)
        )
    }
})

module.exports = User
