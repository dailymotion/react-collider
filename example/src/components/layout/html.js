var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Head   = require('./head/head'),
    Header = require('./header/header'),
    Footer = require('./footer/footer')

var Html = React.createClass({
    getData: function() {
        return this.props.data || {}
    },
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
                                    <RouteHandler data={this.getData()} />
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

module.exports = Html
