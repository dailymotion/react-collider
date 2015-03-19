var Bootstrap = require('./bootstrap'),
    Home = require('./home/home')

var cb = function(err, data) {
    Router.run(Routes, Router.HistoryLocation, function (Handler) {
        window.test = React.renderToString(<Handler data={data} />)
        React.render(<Handler data={data} />, document)
    })
}

if (typeof initialData !== 'undefined') {
    cb(null, initialData)
    initialData = null
}
else {
    Home.fetchData().end(function(err, data) {
        cb(err, data.text)
    })
}
