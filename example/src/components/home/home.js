import React from 'react'
import VideoPreview from './../video/preview'
import {dataProvider as provider} from 'react-collider'

export default class Home extends React.Component {
    static getIds() {
        return 'x2mb4y5,+x2mb373,+x2mmd5u'
    }
    static fetchData() {
        var url = 'https://api.dailymotion.com/videos?fields=id,title,thumbnail_240_url&languages=en&ids=' + Home.getIds()
        return provider(this, url, {once: true})
    }
    componentWillMount() {
        this.getVideosList((data) => this.setState({videos: data}))
    }
    getVideosList(cb) {
        var videos = '',
            i = 0

        var data = this.props.data.Home

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        if (data !== null && typeof data === 'object' && typeof data.list !== 'undefined') {
            videos = data.list.map(function(video) {
                return <VideoPreview key={i++} video={video} />
            })
        }

        cb(videos)
    }
    render() {
        return (
            <div>
                <h1>Videos</h1>
                {this.state.videos}
            </div>
        )
    }
}
