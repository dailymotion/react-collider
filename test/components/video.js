var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var Video = React.createClass({
    statics: {
        fetchData: function() {
            return {
                expose: 'video',
                url: 'https://api.dailymotion.com/video/x1vcexn?fields=title'
            }
        }
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, this.props.data.video.title)
            )
        )
    }
})

module.exports = Video
