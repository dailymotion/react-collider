'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

/**
 * Run react-router then check if the matching routes need to fetch some data
 * Used for both server and client side
 * @param {object} routes
 * @param {mixed} routerArg - string for server side or router argument for client side
 * @param {mixed} fetchHandler - custom fetch handler
 * @param {function} cb
 */
module.exports = reactCollider;

var _Router = require('react-router');

var Router = _interopRequire(_Router);

var _contains = require('ramda');

var _defaultFetchHandler = require('./defaultFetchHandler');

var defaultFetchHandler = _interopRequire(_defaultFetchHandler);

function reactCollider(routes, routerArg, fetchHandler, cb) {
    fetchHandler = typeof fetchHandler === 'function' ? fetchHandler : defaultFetchHandler;
    var components = [],
        params = {};

    var addComponent = function addComponent(component) {
        if (typeof component.fetchData === 'function') {
            if (!_contains.contains(component)(components)) {
                components.push(component);
            }
        }
    };

    var parseDependencies = function parseDependencies(component) {
        if (typeof component.getDependencies === 'function') {
            component.getDependencies().forEach(function (dep) {
                addComponent(dep);
            });
        }
    };

    Router.run(routes, routerArg, function (Handler, state) {
        parseDependencies(routes.props.handler);
        params = state.params;

        state.routes.forEach(function (matchedRoute) {
            parseDependencies(matchedRoute.handler);
            addComponent(matchedRoute.handler);
        });

        if (components.length) {
            fetchHandler(components, params).then(function (data) {
                cb(Handler, data);
            });
        } else {
            components = [];
            cb(Handler, {});
        }
    });
}