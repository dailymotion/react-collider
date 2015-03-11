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

var baseLinks =
[
    {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'},
    {rel: 'stylesheet', href: '/css/main.css'},
    {rel: 'icon', type: 'image/png', href: 'http://static1-preprod.dmcdn.net/images/favicon-32x32.png.ve01cb944231b03752'}
];


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
            links: baseLinks
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
        <img src="http://lorempixel.com/600/400/"/>
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
        Home: Home
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
