var React = require('react')

var Video = React.createClass({
    statics: {
        getModulePath: function() {
            return 'video/video'
        }
    },
    render: function() {
        return (
            <div>
                <h1>Video</h1>
            </div>
        )
    }
})

module.exports = Video
