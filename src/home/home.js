var request = require('superagent'),
    VideoPreview = require('./../video/preview')

var Home = React.createClass({
    statics: {
        fetchData: function() {
            return request.get('https://api.dailymotion.com/videos')
        }
    },
    outputScript: function() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        return {__html: "var initialData = " + data}
    },
    render: function() {
        var videos = '',
            i = 0

        if (typeof this.props.data === 'object') {
            videos = this.props.data.list.map(function(video) {
                return <VideoPreview key={i++} video={video} />
            })
        }

        return (
            <div>
                <h1>Homepage</h1>
                <script dangerouslySetInnerHTML={this.outputScript()} />
            </div>
        )
    }
})

module.exports = Home
