var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var Video = React.createClass({
    statics: {
        expose: function() {
            return 'video'
        },
        fetchData: function() {
            return new Promise(function(resolve) {
                fs.readFile(path.join(__dirname, 'fixtures.json'), 'utf-8', function(err, data) {
                    resolve(JSON.parse(data).title)
                })
            })
        }
    },
    componentWillMount: function() {
        this.setState({video: this.props.data.Video})
    },
    getVideoTitle: function() {
        return this.state.video ? this.state.video : ''
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('h1', null, this.getVideoTitle())
            )
        )
    }
})

module.exports = Video
