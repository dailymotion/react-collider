var React = require('react')

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
        this.setState({data: this.props.data})
    },
    getSidebarContent: function() {
        return this.state.data ? this.state.data.sidebarContent : ''
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
