'use strict';

module.exports = function (Chatuser) {

    Chatuser.remoteMethod('joinroom', {
        accepts: [
            { arg: 'room_id', type: 'string' },
            { arg: 'user_id', type: 'string' }
        ],
        returns: { arg: 'success', type: 'boolean' },
        http: { path: '/joinroom', verb: 'post' }
    });

    Chatuser.joinroom = function (room_id, user_id, cb) {
        Chatuser.app.models.Room.findById(room_id, function (err, room) {
            Chatuser.findById(user_id, function (err, data) {
                data.joinedrooms.add(room, function (err, res) {
                    cb();
                });
            });
        });
    };
};
