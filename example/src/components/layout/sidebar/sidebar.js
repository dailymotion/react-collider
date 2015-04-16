import React from 'react'
import {dataProvider as provider} from 'react-collider'

export default class Sidebar extends React.Component {
    static getIds() {
        return 'xlnf0t,+x1wd0c,+x1d6bdd'
    }
    static fetchData() {
        return provider(this, 'https://api.dailymotion.com/users?fields=avatar_240_url,username&ids=' + Sidebar.getIds())
    }
    componentWillMount() {
        this.getUsersList((data) => this.setState({users: data}))
    }
    getUsersList(cb) {
        var users = '',
            i = 0

        var data = this.props.data

        if (typeof data === 'string') {
            data = JSON.parse(data)
        }

        if (data !== null && typeof data === 'object' && typeof data.list !== 'undefined') {
            users = data.list.map(function(user) {
                return (
                    <div className="row user" key={i++}>
                        <img className="col-lg-5" src={user.avatar_240_url} width="100%" />
                        <span className="col-lg-7">{user.username}</span>
                    </div>
                )
            })
        }

        cb(users)
    }
    render() {
        return (
            <div className={this.props.className}>
                <h3>Users</h3>
                {this.state.users}
            </div>
        )
    }
}
