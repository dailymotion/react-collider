if (typeof module !== 'undefined') {
    var React = require('react');
}

var Videos = React.createClass({
    componentWillMount: function() {
        if (typeof window !== 'undefined') {
            var head = React.render(<Head />, document.querySelector('#html')),
                links = baseLinks.concat([{rel: 'stylesheet', href: '/video/video-list/videos.css'}])
            head.setState({title: 'Video', links: links})
        }
    },
  render: function () {
    return (
        <div className="content">
          <h1>Videos</h1>
          <img src="http://lorempixel.com/200/100/"/>
          <img src="http://lorempixel.com/200/100/"/>
          <img src="http://lorempixel.com/200/100/"/>
          <img src="http://lorempixel.com/200/100/"/>
          <Link to="video">video</Link> <Link to="home">Home</Link>
        </div>
    );
  }
});

if (typeof module !== 'undefined') {
    // server
    module.exports = Videos
}