var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var HomeContent = React.createClass({
    displayName: 'HomeContent',
    statics: {
        fetchData: function() {
            return new Promise(function(resolve) {
                fs.readFile(path.join(__dirname, 'fixtures.json'), 'utf-8', function(err, data) {
                    resolve(JSON.parse(data).homeContent)
                })
            })
        }
    },
    componentWillMount: function() {
        this.setState({data: this.props.data})
    },
    getHomeContent: function() {
        return this.state.data ? this.state.data : ''
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('div', null, this.getHomeContent())
            )
        )
    }
})

module.exports = HomeContent
