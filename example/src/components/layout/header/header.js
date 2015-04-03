var React = require('react'),
    Link  = require('react-router').Link

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <Link to="home">
                    <img height="60px" src="http://static1-preprod.dmcdn.net/images/header/logo_dailymotion@2x.png.v41c4e908eb6427162"/>
                </Link>
                <Link to="home">homepage</Link>
                <Link to="video">video</Link>
            </header>
        )
    }
})

module.exports = Header
