'use strict';

module.exports = function (Message) {
    Message.remoteMethod('sendmessage',
        {
            accepts:
            [
                { arg: 'message', type: 'object', http: { source: 'body' } }
            ],
            returns: { arg: 'success', type: 'boolean' },
            http: { path: '/sendmessage', verb: 'post' }
        });


    Message.sendmessage = function (message, cb) {
        Message.create({
            'content': message.content,
            'userId': message.user_id,
            'roomId': message.room_id,
            'posted_at': new Date()
        },
            function (err, mess) {
                Message.findById(mess.id, {
                    include: { relation: 'user' }
                }, function (err, data) {
                    Message.app.io.to(mess.roomId).emit('message', data); //the message is sent to the other clients using the emit() method of Socket.io
                    cb();
                });

            });
    }
};
