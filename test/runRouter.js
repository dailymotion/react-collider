var assert   = require('chai').assert,
    expect   = require('chai').expect,
    routes   = require('./routing'),
    runRouter = require('../lib/runRouter')

describe('Run Router', function() {
    it('should export a function', function() {
        expect(runRouter).to.be.a('function')
    })

    it('should return an handler and an object', function(done) {
        runRouter(routes, '/', function(Handler, data) {
            expect(Handler).to.be.a('function')
            expect(data).to.be.a('object')
            done()
        })
    })

    it('should return an object with components as keys and data', function(done) {
        runRouter(routes, '/video', function(Handler, data) {
            expect(data).to.have.all.keys('Sidebar', 'Video')
            done()
        })
    })
})
