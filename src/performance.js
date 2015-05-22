export default function performance(path) {
    var time = process.hrtime(),
        startTime = new Date()

    return function() {
        var diff = process.hrtime(time)
        return {
            startTime: startTime,
            path: path,
            time: diff[0] * 1e9 + diff[1]
        }
    }
}
