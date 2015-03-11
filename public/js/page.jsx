/** @jsx React.DOM */

if (typeof module !== 'undefined') {
    var React = require('react');
    var Router = require('react-router');
    var Route = require('react-router').Route;
    var Link = Router.Link;
    var DefaultRoute = require('react-router').DefaultRoute;
    var RouteHandler = require('react-router').RouteHandler;
}
else {
    var Router = ReactRouter;
    var Route = ReactRouter.Route;
    var Link = Router.Link;
    var DefaultRoute = ReactRouter.DefaultRoute;
    var RouteHandler = ReactRouter.RouteHandler;
}

var Meta = React.createClass({
    render: function() {
        return(
            <meta {...this.props}/>
        );
    }
});
var LinkHeader = React.createClass({
    render: function() {
        return(
            <link {...this.props}/>
        );
    }
});

var Header = React.createClass({
    render: function() {
        return(
            <header>
                <img height="60px" src="http://static1-preprod.dmcdn.net/images/header/logo_dailymotion@2x.png.v41c4e908eb6427162"/>
            </header>
        );
    }
});

var Footer = React.createClass({
    render: function() {
        return(
            <footer>
            </footer>
        );
    }
});



var Head = React.createClass({
    getInitialState: function() {
        return {
            title: 'First react test',
            metas:
            [
                {name: 'language', content: 'fr-FR'},
                {property: 'og:url', content: 'http://www.dailymotion.com/fr'},
                {property: 'og:image', content: 'http://static1.dmcdn.net/images/dailymotion-logo-ogtag.png.vd4024a4454f2e2627'},
                {property: 'og:type', content: 'website'}
            ],
            links:
            [
                {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'},
                {rel: 'stylesheet', href: '/css/main.css'},
                {rel: 'icon', type: 'image/png', href: 'http://static1-preprod.dmcdn.net/images/favicon-32x32.png.ve01cb944231b03752'}
            ]
        };
    },
    render: function() {
        var i = 0;
        var metas = this.state.metas.map(function (data) {
            return <Meta key={i++} {...data} />;
        });
        var links = this.state.links.map(function (data) {
            return <LinkHeader key={i++} {...data} />;
        });

        return(
            <head>
                <title>{this.state.title}</title>
                {metas}
                {links}
            </head>
        );
    }
});

var Home = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h1>home</h1>
        <Link to="video">Video</Link>
        <Link to="videos">Videos</Link>
      </div>
    );
  }
});

var Player = React.createClass({
  render: function() {
    var url = 'http://www.dailymotion.com/embed/video/' + this.props.video + '?autoplay=1';
    return (
        <iframe src={url}/>
    );
  }
});

var Videos = React.createClass({
  render: function () {
    return (
        <div className="content">
          <h1>Videos</h1>
          <Link to="video">video</Link> <Link to="home">Home</Link>
        </div>
    );
  }
});
var Video = React.createClass({
    componentWillMount: function() {
        if (typeof window !== 'undefined') {
            var head = React.render(<Head />, document.querySelector('#html')),
                links = head.state.links.concat([{rel: 'stylesheet', href: '/css/second.css'}])
            head.setState({title: 'Video', links: links})
        }
    },
  render: function () {
    return (
        <div className="content">
          <h1>Video</h1>
          <Player video="xzcrhd"/>
          <Link to="videos">videos</Link> <Link to="home">Home</Link>
        </div>
    );
  }
});

// Server side
var App = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        )
    }
})

// Client side
var Content = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
            <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

if (typeof module !== 'undefined') {
    // server
    module.exports = {
        App: App,
        Head: Head,
        Home: Home,
        Videos: Videos,
        Video: Video
    };
}
else {
    //client

    var routes = (
        <Route handler={Content} path="{path}">
          <DefaultRoute handler={Home} />
          <Route path="/" name="home" handler={Home} />
          <Route path="/videos" name="videos" handler={Videos} />
          <Route path="/video" name="video" handler={Video} />
        </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler />, document.querySelector('#body'));
    });
}
