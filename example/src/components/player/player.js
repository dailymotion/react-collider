var React = require('react')

var Player = React.createClass({
    render: function() {
        return (
            <iframe className="player"
                src={'http://dailymotion.com/embed/video/' + this.props.id}
                width="960" height="540" />
        )
    }
})

module.exports = Player
