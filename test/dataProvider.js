var assert   = require('chai').assert,
    expect   = require('chai').expect,
    React    = require('react'),
    provider = require('../dataProvider')

var Video = React.createClass({
    displayName: 'Video',
    render: function() {
        return React.createElement('div', null, 'Dummy component')
    }
})

var videoId = 'x1vcexn',
    otherId = 'x2483dt',
    videoData = {"id":"x1vcexn","title":"Reactjs test - chat webapp"}
    localData = {"id":"localId","title":"Local video title"}

describe('Data Provider', function() {
    it('should export a function', function() {
        expect(provider).to.be.a('function')
    })

    it('should fetch data from a url', function(done) {
        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
            expect(data).to.be.a('string')
            expect(JSON.parse(data).title).to.equal(videoData.title)
            done()
        })
    })

    it('should fetch data from local variable', function(done) {
        global.initialData = {Video: JSON.stringify(localData)}

        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
            expect(data).to.be.a('string')
            expect(JSON.parse(data).title).to.equal(localData.title)
            done()
        })
    })

    it('should fetch data from local variable without removing it', function(done) {
        global.initialData = {Video: JSON.stringify(localData)}

        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {once: false}).then(function(data) {
            expect(JSON.parse(data).title).to.equal(localData.title)

            provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
                expect(JSON.parse(data).title).to.equal(localData.title)
                done()
            })
        })
    })

    it('should fetch data from local variable then remove it fetch from url', function(done) {
        global.initialData = {Video: JSON.stringify(localData)}

        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {once: true}).then(function(data) {
            expect(JSON.parse(data).title).to.equal(localData.title)

            provider('Video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
                expect(JSON.parse(data).title).to.equal(videoData.title)
                done()
            })
        })
    })

    it('should force fetching from the url even the local data exists', function(done) {
        global.initialData = {Video: JSON.stringify(localData)}

        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {forceFetch: true}).then(function(data) {
            expect(JSON.parse(data).title).to.equal(videoData.title)
            done()
        })
    })

    it('should set the variable locally', function(done) {
        global.initialData = {}

        provider(Video, 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {set: true}).then(function(data) {
            expect(JSON.parse(data).title).to.equal(videoData.title)

            provider(Video, 'https://api.dailymotion.com/video/' + otherId + '?fields=id,title').then(function(data) {
                expect(JSON.parse(data).title).to.equal(videoData.title)
                done()
            })
        })
    })
})
