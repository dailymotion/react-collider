import React from 'react'
import Player from './../player/player'
import provider from './../../lib/data-provider'

export default class Video extends React.Component {
    static getVideoId() {
        return 'x2dsjzl'
    }
    static fetchData() {
        return provider('video', 'https://api.dailymotion.com/video/' + Video.getVideoId() + '?fields=id,title', true)
    }
    componentWillMount() {
        this.setState({video: this.getVideo()})
    }
    getVideo() {
        var data = this.props.data.Video

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        return data
    }
    render() {
        return (
            <div>
                <h1>Video</h1>
                <Player id={this.state.video.id} />
            </div>
        )
    }
}
