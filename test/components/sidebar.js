var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var Sidebar = React.createClass({
    statics: {
        fetchData: function() {
            return new Promise(function(resolve) {
                fs.readFile(path.join(__dirname, 'fixtures.json'), 'utf-8', function(err, data) {
                    resolve(JSON.parse(data))
                })
            })
        }
    },
    componentWillMount: function() {
        this.setState({data: this.props.data[0].sidebarContent})
    },
    getSidebarContent: function() {
        return this.state.data ? this.state.data : ''
    },
    render: function() {
        return (
            React.createElement('div', null,
                React.createElement('div', null, this.getSidebarContent())
            )
        )
    }
})

module.exports = Sidebar
