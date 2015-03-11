if (typeof module !== 'undefined') {
    var React = require('react');
}

var Video = React.createClass({
    componentWillMount: function() {
        if (typeof window !== 'undefined') {
            var head = React.render(<Head />, document.querySelector('#html')),
                links = baseLinks.concat([{rel: 'stylesheet', href: '/video/video-item/video.css'}])
            head.setState({title: 'Video', links: links})
        }
    },
  render: function () {
    return (
        <div className="content">
          <h1>Video</h1>
          <Player video="xzcrhd"/>
        </div>
    );
  }
});

if (typeof module !== 'undefined') {
    // server
    module.exports = Video
}