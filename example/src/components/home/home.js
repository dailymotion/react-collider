var React = require('react'),
    VideoPreview = require('./../video/preview'),
    provider = require('./../../lib/data-provider')

var Home = React.createClass({
    statics: {
        fetchData: function() {
            return provider('wtw-videos', 'https://api.dailymotion.com/videos&list=what-to-watch&fields=title,thumbnail_240_url', true)
        }
    },
    componentWillMount: function() {
        console.log('componentWillMount')

        var self = this
        this.getVideosList(function(data) {
            self.setState({videos: data})
        })
    },
    outputScript: function() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        return {__html: "var initialData = " + data}
    },
    getVideosList: function(cb) {
        var videos = '',
            i = 0

        var data = this.props.data

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        if (typeof data === 'object' && typeof data.list !== 'undefined') {
            videos = data.list.map(function(video) {
                return <VideoPreview key={i++} video={video} />
            })
        }

        cb(videos)
    },
    render: function() {
        return (
            <div>
                <h1>Homepage</h1>
                {this.state.videos}
                <script dangerouslySetInnerHTML={this.outputScript()} />
            </div>
        )
    }
})

module.exports = Home
