var expect    = require('chai').expect,
    client    = require('../client')

describe('Client', function() {
    it('should export a function', function() {
        expect(client).to.be.a('function')
    })
})
