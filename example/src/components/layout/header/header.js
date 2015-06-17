import React from 'react'
import {Link} from 'react-router'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Link to="/">
                    <img height="60px" src="http://static1-preprod.dmcdn.net/images/header/logo_dailymotion@2x.png.v41c4e908eb6427162"/>
                </Link>
            </header>
        )
    }
}
