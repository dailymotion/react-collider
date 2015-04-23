'use strict';

module.exports.server = require('./lib/reactCollider').server
module.exports.client = require('./lib/reactCollider').client

// Export for non-express apps
module.exports.collider = require('./lib/runRouter')

module.exports.dataProvider = require('./lib/dataProvider')
