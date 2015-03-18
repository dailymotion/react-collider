var Home = React.createClass({
    componentWillMount: function() {
        var head = React.render(<Head />, document.querySelector('#html'))
        head.setState({title: 'Homepage'})
    },
    render: function() {
        return (
            <div>
                <h1>Homepage</h1>
            </div>
        )
    }
})

module.exports = Home
