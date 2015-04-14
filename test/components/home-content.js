var React = require('react')

var HomeContent = React.createClass({
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
        this.setState({data: this.props.data[0]})
    },
    getHomeContent: function() {
        return this.state.data ? this.state.data.homeContent : ''
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
