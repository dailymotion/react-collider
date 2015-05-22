import React from 'react'
import Player from './../player/player'
import provider from 'react-collider/dataProvider'

export default class Video extends React.Component {
    static expose(params) {
        return 'videoData'
    }
    static fetchData(params) {
        var url = `https://api.dailymotion.com/video/${params.id}?fields=id,title`
        return provider(Video.expose(), url)
    }
    render() {
        return (
            <div>
                <h1>{this.props.data.videoData.title}</h1>
                <Player id={this.props.data.videoData.id} />
            </div>
        )
    }
}
