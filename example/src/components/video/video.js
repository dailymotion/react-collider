var React = require('react'),
    Player = require('./../player/player'),
    provider = require('./../../lib/data-provider')

var Video = React.createClass({
    statics: {
        getVideoId: function() {
            return 'x2dsjzl'
        },
        fetchData: function() {
            return provider('video', 'https://api.dailymotion.com/video/' + Video.getVideoId() + '?fields=id,title', true)
        }
    },
    componentWillMount: function() {
        this.setState({video: this.getVideo()})
    },
    outputScript: function() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        return {__html: "var initialData = " + data}
    },
    getVideo: function() {
        var data = this.props.data

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        return data
    },
    render: function() {
        return (
            <div>
                <h1>Video</h1>
                <Player id={this.state.video.id} />
                <script dangerouslySetInnerHTML={this.outputScript()} />
            </div>
        )
    }
})

module.exports = Video
