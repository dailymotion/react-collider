var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var HomeContent = React.createClass({
    displayName: 'HomeContent',
    statics: {
        fetchData: function() {
            return {
                expose: 'HomeContent',
                url: 'https://api.dailymotion.com/video/x1vcexn?fields=title'
            }
        }
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('div', null, this.props.data.HomeContent.title)
            )
        )
    }
})

module.exports = HomeContent
