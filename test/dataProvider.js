var expect   = require('chai').expect,
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
        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
            expect(data).to.be.an('object')
            expect(data.title).to.equal(videoData.title)
            done()
        })
    })

    it('should fetch data from local variable', function(done) {
        global.initialData = {video: localData}

        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
            expect(data).to.be.an('object')
            expect(data.title).to.equal(localData.title)
            done()
        })
    })

    it('should fetch data from local variable without removing it', function(done) {
        global.initialData = {video: localData}

        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {once: false}).then(function(data) {
            expect(data.title).to.equal(localData.title)

            provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
                expect(data.title).to.equal(localData.title)
                done()
            })
        })
    })

    it('should fetch data from local variable then remove it fetch from url', function(done) {
        global.initialData = {video: localData}

        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {once: true}).then(function(data) {
            expect(data.title).to.equal(localData.title)

            provider('Video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title').then(function(data) {
                expect(data.title).to.equal(videoData.title)
                done()
            })
        })
    })

    it('should force fetching from the url even the local data exists', function(done) {
        global.initialData = {video: localData}

        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {forceFetch: true}).then(function(data) {
            expect(data.title).to.equal(videoData.title)
            done()
        })
    })

    it('should set the variable locally', function(done) {
        global.initialData = {}

        provider('video', 'https://api.dailymotion.com/video/' + videoId + '?fields=id,title', {set: true}).then(function(data) {
            expect(data.title).to.equal(videoData.title)

            provider('video', 'https://api.dailymotion.com/video/' + otherId + '?fields=id,title').then(function(data) {
                expect(data.title).to.equal(videoData.title)
                done()
            })
        })
    })

    it('should return an API error', function(done) {
        provider('error', 'https://api.dailymotion.com/error').then(function(data) {
            expect(data).to.have.key('error')
            expect(data.error.code).to.equal(501)
            done()
        })
    })
})
