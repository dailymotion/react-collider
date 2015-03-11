if (typeof module !== 'undefined') {
    var React = require('react');
}

var Videos = React.createClass({
    componentWillMount: function() {
        if (typeof window !== 'undefined') {
            var head = React.render(<Head />, document.querySelector('#html')),
                links = baseLinks.concat([{rel: 'stylesheet', href: '/video/video-list/videos.css'}])
            head.setState({title: 'Videos', links: links})
        }
    },
  render: function () {
    var res = '';
    for(i=0;i<100;i++)
    {
      res += '<img src="http://lorempixel.com/200/100/?' + i + '"/>';
    }
    return (
        <div className="content">
          <h1>Videos</h1>
          <div className="commentBox" dangerouslySetInnerHTML={{ __html: res }}/>
        </div>
    );
  }
});

if (typeof module !== 'undefined') {
    // server
    module.exports = Videos
}