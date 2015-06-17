import React from 'react'
import VideoPreview from './../video/preview'
import provider from 'react-collider/dataProvider'

export default class Home extends React.Component {
    static fetchData() {
        return {
            expose: 'Home',
            url: 'https://api.dailymotion.com/videos?fields=id,title,thumbnail_720_url&languages=en&limit=5&list=what-to-watch',
            params: {once: false}
        }
    }
    getVideosList(cb) {
        return this.props.data.Home.list.map((video, i) => {
            return <VideoPreview key={i} video={video} />
        })
    }
    render() {
        return (
            <div>
                <h1>Videos</h1>
                {this.getVideosList()}
            </div>
        )
    }
}
