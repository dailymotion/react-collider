import React from 'react'
import provider from 'react-collider/dataProvider'

export default class Sidebar extends React.Component {
    static fetchData() {
        return {
            expose: 'Sidebar',
            url: 'https://api.dailymotion.com/users?fields=avatar_240_url,username&limit=5&list=recommended',
            params: {once: false}
        }
    }
    getUsersList(cb) {
        return this.props.data.list.map((user, i) => {
            return (
                <div className="row user" key={i}>
                    <img className="col-lg-5" src={user.avatar_240_url} width="100%" />
                    <span className="col-lg-7">{user.username}</span>
                </div>
            )
        })
    }
    render() {
        return (
            <div className={this.props.className}>
                <h3>Users</h3>
                {this.getUsersList()}
            </div>
        )
    }
}
