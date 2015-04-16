import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h3>React Collider</h3>
                        </div>
                        <div className="col-sm-3">
                            by <a href="http://dailymotion.com">Dailymotion</a>
                        </div>
                        <div className="col-sm-3">
                            <a className="btn btn-default" href="https://github.com/dailymotion/react-collider">View on GitHub</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
