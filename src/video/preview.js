var VideoPreview = React.createClass({
    render: function() {
        var col = this.props.col || 4

        return (
            <div className={'col-sm-' + col}>
                <div className="row">
                    <div className="col-sm-8">
                        <img src={this.props.video.thumbnail_240_url} width="100%" />
                    </div>
                    <div className="col-sm-4">
                        <h3>
                            <a href={this.props.video.url}>{this.props.video.title}</a>
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = VideoPreview
