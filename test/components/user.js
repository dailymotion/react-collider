var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var User = React.createClass({
    displayName: 'User',
    statics: {
        fetchData: function(params) {
            return new Promise(function(resolve) {
                resolve({user: params.id})
            })
        }
    },
    // componentWillMount: function() {
    //     this.setState({video: this.props.data.Video})
    // },
    // getVideoTitle: function() {
    //     return this.state.video ? this.state.video : ''
    // },
    render: function() {
        return (
            React.createElement('div', null)
        )
    }
})

module.exports = User
