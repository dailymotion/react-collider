var request = require('superagent'),
    VideoPreview = require('./../video/preview'),
    Promise = require('bluebird')

var Home = React.createClass({
    statics: {
        getModulePath: function() {
            return 'home/home'
        },
        fetchData: function() {
            return new Promise(function(resolve) {
                if (typeof initialData !== 'undefined' && initialData !== null) {
                    var data = initialData
                    initialData = null
                    resolve(data)
                }
                else {
                    request.get('https://api.dailymotion.com/videos&list=what-to-watch&fields=title,thumbnail_240_url').end(function(err, data) {
                        resolve(data.text)
                    })
                }
            })
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
