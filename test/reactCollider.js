var assert   = require('chai').assert,
    expect   = require('chai').expect,
    http     = require('http'),
    path     = require('path'),
    request  = require('supertest'),
    collider = require('..'),
    routes   = require('./routing')

describe('React Collider', function() {
    var server

    before(function() {
        server = createServer()
    })

    it('should export a server function', function() {
        assert(typeof collider.server, 'function')
    })

    it('should export a client function', function() {
        assert(typeof collider.client, 'function')
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
            expect(res.text).to.have.string('Cool video with kitten')
        })
        .end(done)
    })
})

function createServer() {
    var reactCollider = collider.server(routes, path.join(__dirname, 'components'))

    return http.createServer(function(req, res) {
        reactCollider(req, res)
    })
}
