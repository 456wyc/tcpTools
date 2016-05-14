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
            return sender.send(msgBuff)
        }
    }
}


function MessageReader(MsgHeaderClass, opt) {
    return {
        read: function (data) {
            var reader = Reader(opt);
            var msgBuff = reader.read(data);
            var msg = null;
            if (msgBuff != null) {
                /*try {
                    msg = MsgHeaderClass.decode(msgBuff);
                } catch (e) {
                    console.log('Message decode failed! Err:%s', e.message)
                }*/
                msg = MsgHeaderClass.decode(msgBuff);
            }
            return msg;
        }
    }
}

exports.MessageSender = MessageSender;
exports.MessageReader = MessageReader;