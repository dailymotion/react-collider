'use strict';

module.exports.server = require('./reactCollider').server
module.exports.client = require('./reactCollider').client

// Export for non-express apps
module.exports.collider = require('./runRouter')

module.exports.dataProvider = require('./dataProvider')
