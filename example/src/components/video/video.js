import React from 'react'
import Player from './../player/player'
import provider from 'react-collider/dataProvider'

export default class Video extends React.Component {
    static fetchData(params) {
        return {
            expose: 'VideoData',
            url: `https://api.dailymotion.com/video/${params.id}?fields=id,title`
        }
    }
    render() {
        return (
            <div>
                <h1>{this.props.data.VideoData.title}</h1>
                <Player id={this.props.data.VideoData.id} />
            </div>
        )
    }
}
