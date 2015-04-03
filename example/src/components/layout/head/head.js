var React = require('react')

var MetaElement = React.createClass({
    render: function() {
        return <meta {...this.props}/>
    }
})

var LinkElement = React.createClass({
    render: function() {
        return <link {...this.props}/>
    }
})

var baseLinks = [
    {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'},
    {rel: 'stylesheet', href: '/main.css'},
    {rel: 'icon', type: 'image/png', href: 'http://static1-preprod.dmcdn.net/images/favicon-32x32.png.ve01cb944231b03752'}
]

var Head = React.createClass({
    getInitialState: function() {
        return {
            title: 'Daily Collider',
            metas:
            [
                {name: 'language', content: 'fr-FR'},
                {property: 'og:url', content: 'http://www.dailymotion.com/fr'},
                {property: 'og:image', content: 'http://static1.dmcdn.net/images/dailymotion-logo-ogtag.png.vd4024a4454f2e2627'},
                {property: 'og:type', content: 'website'}
            ],
            links: baseLinks
        }
    },
    render: function() {
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
            </head>
        )
    }
})

module.exports = Head
