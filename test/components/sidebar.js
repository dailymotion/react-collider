var React = require('react'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird')

var Sidebar = React.createClass({
    statics: {
        expose: function() {
            return 'sidebar'
        },
        fetchData: function() {
            return new Promise(function(resolve) {
                fs.readFile(path.join(__dirname, 'fixtures.json'), 'utf-8', function(err, data) {
                    resolve(JSON.parse(data).sidebarContent)
                })
            })
        }
    },
    componentWillMount: function() {
        this.setState({data: this.props.data})
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
