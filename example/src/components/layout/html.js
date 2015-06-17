import React from 'react'
import {RouteHandler} from 'react-router'
import Head from './head/head'
import Header from './header/header'
import Footer from './footer/footer'
import Sidebar from './sidebar/sidebar'
import stringify from 'json-stable-stringify'

export default class Html extends React.Component {
    static getDependencies() {
        return [Sidebar]
    }
    outputScript() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = stringify(data)
        }

        return {__html: "var initialData = " + data}
    }
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="container">
                        <div className="row">
                            <Sidebar className="col-lg-2" data={this.props.data.Sidebar} />
                            <div className="col-lg-10">
                                <RouteHandler data={this.props.data} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                    <script dangerouslySetInnerHTML={this.outputScript()} />
                    <script src="/bundle.js"></script>
                </body>
            </html>
        )
    }
}
