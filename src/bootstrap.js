require('./deps')
var routes = require('./routes')

// App
var RouteHandler = Router.RouteHandler

var Bootstrap = React.createClass({
    render: function() {
        return (
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
        )
    }
})

var args = [
    Router.Route,
    {"handler": Bootstrap, "path": "{path}"},
    React.createElement(Router.DefaultRoute, {"handler": routes.defaultRoute})
]

for (var routeIndex in routes.routes) {
    var route = routes.routes[routeIndex]
    args.push(React.createElement(Router.Route, {path: route.path, name: route.name, handler: route.handler}))
}

global.Routes = React.createElement.apply(null, args)

module.exports = Bootstrap
