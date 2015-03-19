require('./deps')

// App
var RouteHandler = Router.RouteHandler

var Bootstrap = React.createClass({
    render: function() {
        return (
            <html id="html">
                <Head />
                <body id="body">
                    <div>
                        <Header />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <RouteHandler />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        )
    }
})

// Require your pages
var Route = require('react-router').Route,
    DefaultRoute = require('react-router').DefaultRoute,
    Home  = require('./home/home'),
    Video = require('./video/video'),

    routes = (
        <Route handler={Bootstrap} path="/">
            <DefaultRoute handler={Home} />
            <Route name="home" handler={Home} />
            <Route name="video" handler={Video} />
        </Route>
    )

global.Routes = routes

module.exports = Bootstrap
