import React from 'react'

export default class Player extends React.Component {
    render() {
        return (
            <div className="player">
                <iframe
                    src={'http://dailymotion.com/embed/video/' + this.props.id}
                    width="960" height="540" />
            </div>
        )
    }
}
