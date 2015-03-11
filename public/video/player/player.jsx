if (typeof module !== 'undefined') {
    var React = require('react');
}

var Player = React.createClass({
  render: function() {
    var url = 'http://www.dailymotion.com/embed/video/' + this.props.video + '?autoplay=1';
    return (
        <iframe src={url}/>
    );
  }
});

if (typeof module !== 'undefined') {
    // server
    module.exports = Player
}