var VideoPreview = React.createClass({
    render: function() {
        return (
            <div className="video-preview">
                <div className="row">
                    <div className="col-sm-6">
                        <img src={this.props.video.thumbnail_240_url} width="100%" />
                    </div>
                    <div className="col-sm-6">
                        <h3>
                            {this.props.video.title}
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = VideoPreview
