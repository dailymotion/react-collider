var expect    = require('chai').expect,
    routes    = require('./routing'),
    Promise   = require('bluebird'),
    collider  = require('..')

describe('React Collider', function() {
    it('should export a function', function() {
        expect(collider).to.be.a('function')
    })

    it('should return an handler and an object', function(done) {
        collider(routes, '/', null, function(Handler, data) {
            expect(Handler).to.be.a('function')
            expect(data).to.be.a('object')
            done()
        })
    })

    it('should return an object with components as keys and data - Home', function(done) {
        collider(routes, '/', null, function(Handler, data) {
            expect(data).to.have.all.keys('sidebar-users', 'sidebar-channels', 'user-card', 'HomeContent')
            done()
        })
    })

    it('should return an object with components as keys and data - Video', function(done) {
        collider(routes, '/video', null, function(Handler, data) {
            expect(data).to.have.all.keys('sidebar-users', 'sidebar-channels', 'user-card', 'video')
            done()
        })
    })

    it('should get the params', function(done) {
        collider(routes, '/user/1', null, function(Handler, data) {
            expect(data).to.have.all.keys('sidebar-users', 'sidebar-channels', 'user-card', 'user')
            expect(data.user.username).to.equal('romainberger')
            done()
        })
    })
})

describe('Run Router with custom fetch handler', function() {
    it('should run a custom fetch handler with an array of components', function(done) {
        var customFetchHandler = function(components) {
            return new Promise(function(resolve) {
                expect(components).to.be.a('array')
                expect(components.length).to.equal(3)
                expect(components[0]).to.be.a('function')
                resolve({})
            })
        }

        collider(routes, '/', customFetchHandler, function() {
            done()
        })
    })

    it('should return an object corresponding to what the fetch handler returns', function(done) {
        var customFetchHandler = function(components) {
            return new Promise(function(resolve) {
                resolve({customData: 'custom-data'})
            })
        }

        collider(routes, '/', customFetchHandler, function(Handler, data) {
            expect(data.customData).to.equal('custom-data')
            done()
        })
    })
})
