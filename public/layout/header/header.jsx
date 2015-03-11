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

var Header = React.createClass({
    render: function() {
        return(
            <header>
                <Link to="home">
                    <img height="60px" src="http://static1-preprod.dmcdn.net/images/header/logo_dailymotion@2x.png.v41c4e908eb6427162"/>
                </Link>
                <Link to="video">video</Link> <Link to="videos">videos</Link>
            </header>
        );
    }
});


if (typeof module !== 'undefined') {
    // server
    module.exports = Header
}