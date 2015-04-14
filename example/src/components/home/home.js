import React from 'react'
import VideoPreview from './../video/preview'
import provider from './../../lib/data-provider'

export default class Home extends React.Component {
    static getIds() {
        return 'x2mb4y5,+x2mb373,+x2mmd5u'
    }
    static fetchData() {
        var url = 'https://api.dailymotion.com/videos?fields=id,title,thumbnail_240_url&languages=en&ids=' + Home.getIds()
        return provider('wtw-videos', url, true)
    }
    componentWillMount() {
        var self = this
        this.getVideosList(function(data) {
            self.setState({videos: data})
        })
    }
    getVideosList(cb) {
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
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                {this.state.videos}
            </div>
        )
    }
}
