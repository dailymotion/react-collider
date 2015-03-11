path    = require 'path'
express = require 'express'
app     = express()

app.use express.static(path.join(__dirname, 'public'))

app.get '*', (req, res) ->
    res.sendFile path.join(__dirname, 'views/index.html')

module.exports = app
