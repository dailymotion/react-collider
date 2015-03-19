var VideoPreview = React.createClass({
    render: function() {
        var col = this.props.col || 4

        return (
            <div className={'col-sm-' + col}>
                <div className="row">
                    <div className="col-sm-12">
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
