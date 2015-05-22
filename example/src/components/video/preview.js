import React from 'react'
import {Link} from 'react-router'

export default class VideoPreview extends React.Component {
    render() {
        return (
            <div className="video-preview">
                <div className="row">
                    <div className="col-sm-6">
                        <Link to="video" params={{id: this.props.video.id}}>
                            <img src={this.props.video.thumbnail_720_url} width="100%" />
                        </Link>
                    </div>
                    <div className="col-sm-6">
                        <h3>
                            <Link to="video" params={{id: this.props.video.id}}>
                                {this.props.video.title}
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}
