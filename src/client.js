import React from 'react'
import Router from 'react-router'
import collider from './reactCollider'
import {merge} from 'ramda'

const defaultOptions = {
    fetch: null
}

// Client side rendering
var renderPage = function reanderPage(Handler, data) {
    React.render(React.createElement(Handler, {data: data}), document)
}

export default function client(routes, options) {
    options = merge(defaultOptions, options)

    var fetchHandler = typeof options.fetchHandler === 'function' ? options.fetchHandler : null
    collider(routes, Router.HistoryLocation, fetchHandler, function(Handler, data) {
        renderPage(Handler, data)
    })
}
