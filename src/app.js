var Bootstrap = require('./bootstrap'),
    Home = require('./home/home')

var renderPage = function(Handler, data) {
    data = typeof data === 'string' ? JSON.parse(data) : data
    data = typeof data === 'object' ? data : null
    React.render(<Handler data={data} />, document)
}

Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
    var fetchToRun = null,
        matchedHandler = null

    state.routes.forEach(function(matchedRoute) {
        if (typeof matchedRoute.handler.fetchData === 'function') {
            matchedHandler = matchedRoute.handler.displayName
            fetchToRun = require('./' + matchedRoute.handler.getModulePath()).fetchData
        }
    })

    if (typeof fetchToRun === 'function') {
        console.log('Fetching data from ' + matchedHandler)
        fetchToRun().then(function(data) {
            renderPage(Handler, data)
        })
    }
    else {
        renderPage(Handler)
    }
})
