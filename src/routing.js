require('./deps')

var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Html = require('./components/layout/html')

// Require your pages
var Home  = require('./components/home/home'),
    Video = require('./components/video/video')

// Declare your routes
var routes = (
    <Route handler={Html} path="/">
        <DefaultRoute handler={Home} />
        <Route name="home" handler={Home} />
        <Route name="video" handler={Video} />
    </Route>
)

global.Routes = routes
