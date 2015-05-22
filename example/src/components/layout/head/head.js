import React from 'react'

class MetaElement extends React.Component {
    render() {
        return <meta {...this.props}/>
    }
}

class LinkElement extends React.Component {
    render() {
        return <link {...this.props}/>
    }
}

export default class Head extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Daily Collider',
            metas:
            [
                {name: 'language', content: 'fr-FR'},
                {property: 'og:url', content: 'http://www.dailymotion.com/fr'},
                {property: 'og:image', content: 'http://static1.dmcdn.net/images/dailymotion-logo-ogtag.png.vd4024a4454f2e2627'},
                {property: 'og:type', content: 'website'}
            ],
            links: [
                {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'},
                {rel: 'stylesheet', href: '/main.css'},
                {rel: 'icon', type: 'image/png', href: 'http://static1-preprod.dmcdn.net/images/favicon-32x32.png.ve01cb944231b03752'}
            ]
        }
    }
    render() {
        var i = 0,
            metas = this.state.metas.map(function (data) {
                return <MetaElement key={i++} {...data} />
            }),
            links = this.state.links.map(function (data) {
                return <LinkElement key={i++} {...data} />
            })

        return (
            <head>
                <title>{this.state.title}</title>
                {metas}
                {links}
                <meta charSet="utf-8" />
            </head>
        )
    }
}
