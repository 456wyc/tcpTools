/**
 * Created by wyc on 16/5/12.
 */

var Sender = require('./sender');
var Reader = require('./reader');

function MessageSender(MsgHeaderClass, socket, opt) {
    return {
        send: function (msg) {
            var msgBuff = new MsgHeaderClass(msg).encode().toBuffer();
            var sender = Sender(socket, opt);
            return sender.send(msgBuff);
        }
    }
}


function MessageReader(MsgHeaderClass, opt) {
    return {
        _reader:Reader(opt),
        read: function (data) {
            var msgBuff = this._reader.read(data);
            var msg = null;
            if (msgBuff !== null) {
                try {
                    msg = MsgHeaderClass.decode(msgBuff);
                } catch (e) {
                    console.log('Message decode failed! Err:%s', e.message)
                    msg = null;
                }
            }
            return msg;
        }
    }
}

exports.MessageSender = MessageSender;
exports.MessageReader = MessageReader;