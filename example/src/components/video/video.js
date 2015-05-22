import React from 'react'
import Player from './../player/player'
import provider from 'react-collider/dataProvider'

export default class Video extends React.Component {
    static getVideoId() {
        return 'x2dsjzl'
    }
    static expose() {
        return 'videoData'
    }
    static fetchData() {
        var url = 'https://api.dailymotion.com/video/' + Video.getVideoId() + '?fields=id,title'
        return provider(Video.expose(), url)
    }
    componentWillMount() {
        this.setState({video: this.getVideo()})
    }
    getVideo() {
        var data = this.props.data.videoData

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        return data
    }
    render() {
        return (
            <div>
                <h1>{this.getVideo().title}</h1>
                <Player id={this.state.video.id} />
            </div>
        )
    }
}
