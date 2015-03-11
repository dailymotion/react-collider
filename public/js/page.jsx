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
        var metas = this.state.metas.map(function (data) {
            return <Meta {...data} />;
        });
        var links = this.state.links.map(function (data) {
            return <LinkHeader {...data} />;
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

var App = React.createClass({
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

var Body = React.createClass({
    render: function() {
        return (
            <html id="html">
                <body id="body">
                    <App />
                    <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/JSXTransformer.js"></script>
                    <script src="/bower_components/react-router/build/global/ReactRouter.js"></script>
                    <script type="text/jsx" src="/js/page.jsx"></script>
                </body>
            </html>
        )
    }
})

if (typeof module !== 'undefined') {
    module.exports = {
        Body: Body,
        App: App,
        Home: Home,
        Videos: Videos,
        Video: Video
    };
}
else {
    var head = React.renderComponent(
        <Head/>,
        document.getElementById('html')
    );

    var routes = (
        <Route handler={App} path="{path}">
          <DefaultRoute handler={Home} />
          <Route path="/" name="home" handler={Home} />
          <Route path="/videos" name="videos" handler={Videos} />
          <Route path="/video" name="video" handler={Video} />
        </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler />, document.body);
    });
}
