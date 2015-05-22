var expect = require('chai').expect,
    performance = require('./../lib/performance')

describe('Performance', function() {
    it('should export a function', function() {
        expect(performance).to.be.a('function')
    })

    it('should return an object', function() {
        var perfInstance = performance('/'),
            result = perfInstance()

        expect(result).to.be.a('object')
        expect(result).to.have.all.keys('startTime', 'path', 'time')
    })

    it('should return valid infos', function() {
        var perfInstance = performance('/video'),
            result = perfInstance()

        expect(result.startTime).to.be.a('date')
        expect(result.path).to.equal('/video')
        expect(result.time).to.be.a('number')
    })
})
