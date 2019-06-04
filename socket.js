var status = require('./status');
module.exports = function (io) {
    io.on('connection', function (socket) {
        status.socket = socket;
        socket.emit('status', status ? status.status : {})
    })
}