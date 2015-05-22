import React from 'react'
import VideoPreview from './../video/preview'
import provider from 'react-collider/dataProvider'

export default class Home extends React.Component {
    static expose() {
        return 'Home'
    }
    static fetchData() {
        var url = 'https://api.dailymotion.com/videos?fields=id,title,thumbnail_720_url&languages=en&limit=5&list=what-to-watch'
        return provider(Home.expose(), url, {once: false})
    }
    getVideosList(cb) {
        var i = 0

        return this.props.data.Home.list.map((video) => {
            return <VideoPreview key={i++} video={video} />
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
