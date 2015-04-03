import React from 'react'

export default class Player extends React.Component {
    render() {
        return (
            <iframe className="player"
                src={'http://dailymotion.com/embed/video/' + this.props.id}
                width="960" height="540" />
        )
    }
}
