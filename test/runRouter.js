var expect    = require('chai').expect,
    routes    = require('./routing'),
    Promise   = require('bluebird'),
    runRouter = require('..')

describe('Run Router', function() {
    it('should export a function', function() {
        expect(runRouter).to.be.a('function')
    })

    it('should return an handler and an object', function(done) {
        runRouter(routes, '/', null, function(Handler, data) {
            expect(Handler).to.be.a('function')
            expect(data).to.be.a('object')
            done()
        })
    })

    it('should return an object with components as keys and data - Video', function(done) {
        runRouter(routes, '/', null, function(Handler, data) {
            expect(data).to.have.all.keys('Sidebar', 'HomeContent')
            done()
        })
    })

    it('should return an object with components as keys and data - Home', function(done) {
        runRouter(routes, '/video', null, function(Handler, data) {
            expect(data).to.have.all.keys('Sidebar', 'Video')
            done()
        })
    })

    it('should get the params', function(done) {
        runRouter(routes, '/user/1', null, function(Handler, data) {
            expect(data).to.have.all.keys('Sidebar', 'User')
            expect(data.User.user).to.equal('1')
            done()
        })
    })
})

describe('Run Router with custom fetch handler', function() {
    it('should run a custom fetch handler with an array of components', function(done) {
        var customFetchHandler = function(components) {
            return new Promise(function(resolve) {
                expect(components).to.be.a('array')
                expect(components.length).to.equal(2)
                expect(components[0]).to.be.a('function')
                resolve({})
            })
        }

        runRouter(routes, '/', customFetchHandler, function() {
            done()
        })
    })

    it('should return an object corresponding to what the fetch handler returns', function(done) {
        var customFetchHandler = function(components) {
            return new Promise(function(resolve) {
                resolve({customData: 'custom-data'})
            })
        }

        runRouter(routes, '/', customFetchHandler, function(Handler, data) {
            expect(data.customData).to.equal('custom-data')
            done()
        })
    })
})
