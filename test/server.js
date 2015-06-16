var expect   = require('chai').expect,
    http     = require('http'),
    request  = require('supertest'),
    collider = require('../server'),
    routes   = require('./routing')

describe('Server', function() {
    var server

    before(function() {
        server = createServer()
    })

    it('should export a server function', function() {
        expect(collider).to.be.a('function')
    })

    it('should render a page with no data', function(done) {
        request(server)
        .get('/')
        .expect(function(res) {
            expect(res.text).to.have.string('Homepage')
        })
        .end(done)
    })

    it('should render another page with no data', function(done) {
        request(server)
        .get('/page')
        .expect(200)
        .expect(function(res) {
            expect(res.text).to.have.string('Other Page')
        })
        .end(done)
    })

    it('should render a page with data', function(done) {
        request(server)
        .get('/video')
        .expect(200)
        .expect(function(res) {
            expect(res.text).to.have.string('Reactjs test - chat webapp')
        })
        .end(done)
    })

    it('should fetch data for the router main handler children', function(done) {
        request(server)
        .get('/')
        .expect(200)
        .expect(function(res) {
            expect(res.text).to.have.string('romainberger')
        })
        .end(done)
    })

    it('should fetch data for the routes handler children', function(done) {
        request(server)
        .get('/')
        .expect(200)
        .expect(function(res) {
            expect(res.text).to.have.string('Reactjs test - chat webapp')
        })
        .end(done)
    })
})

function createServer() {
    var reactCollider = collider(routes)

    return http.createServer(function(req, res) {
        reactCollider(req, res)
    })
}
