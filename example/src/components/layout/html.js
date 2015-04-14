import React from 'react'
import {RouteHandler} from 'react-router'
import Head from './head/head'
import Header from './header/header'
import Footer from './footer/footer'
import Sidebar from './sidebar/sidebar'

export default class Html extends React.Component {
    getData() {
        return this.props.data || {}
    }
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10">
                                <RouteHandler data={this.getData()} />
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
