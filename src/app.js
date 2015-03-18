var Bootstrap = require('./bootstrap')

Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.querySelector('#body'))
})
