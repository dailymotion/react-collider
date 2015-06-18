var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var UserCard = React.createClass({
    statics: {
        fetchData: function() {
            return {
                expose: 'user-card',
                url: 'https://api.dailymotion.com/user/romainberger?fields=username'
            }
        }
    },
    render: function() {
        return (
            React.createElement('div', null, this.props.data['user-card'].username)
        )
    }
})

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
        },
        getDependencies: function() {
            return [UserCard]
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
