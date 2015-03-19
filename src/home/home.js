var VideoPreview = require('./../video/preview')

var Home = React.createClass({
    getInitialState: function() {
        return {videos: []}
    },
    componentWillMount: function() {
        // if (typeof document !== 'undefined') {
        //     var head = React.render(<Head />, document.querySelector('#html'))
        //     head.setState({title: 'Homepage'})
        // }
    },
    render: function() {
        console.log('render')

        return (
            <div>
                <h1>Homepage</h1>
            </div>
        )
    }
})

module.exports = Home
