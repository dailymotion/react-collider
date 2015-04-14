import React from 'react'
import {RouteHandler} from 'react-router'
import Head from './head/head'
import Header from './header/header'
import Footer from './footer/footer'
import Sidebar from './sidebar/sidebar'

export default class Html extends React.Component {
    static getDependencies() {
        return [Sidebar]
    }
    getData() {
        return this.props.data || {}
    }
    outputScript() {
        var data = this.props.data
        if (typeof data === 'object') {
            data = JSON.stringify(data)
        }

        return {__html: "var initialData = " + data}
    }
    render() {
        // <script dangerouslySetInnerHTML={this.outputScript()} />
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
                    <script src="/bundle.js"></script>
                </body>
            </html>
        )
    }
}
