import React from 'react'
import provider from './../../../lib/data-provider'

export default class Sidebar extends React.Component {
    static fetchData() {
        console.log('fetch')
        return provider('sidebar-users', 'https://api.dailymotion.com/users?list=recommended&fields=avatar_240_url,username')
    }
    render() {
        return (
            <div className={this.props.className}>
                Sidebar
            </div>
        )
    }
}
