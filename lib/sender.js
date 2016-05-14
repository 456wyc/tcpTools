/********************************************************************
 * Copyright (C) 2015 上海魔霸网络科技有限公司. All Rights Reserved.
 *
 * @project tcpTools
 * @file WebStorm
 * @brief
 * @author wangyinchuan
 * @email wangyinchuan@7fgame.com
 * @date 2016/5/11
 *
 ********************************************************************
 */

var defOpt = require('./option');

function Sender(socket, opt) {
    var headerSize = defOpt.HEADER_SEZI;
    if (opt) {
        if (opt.headerSize) {
            headerSize = opt.headerSize;
        }
    }

    function sendMessage(socket, msg) {
        var msg_len = msg.length + headerSize;
        var b       = new Buffer(msg_len);
        b.writeUInt32LE(msg_len, 0);
        msg.copy(b, headerSize);
        socket.write(b);
    }

    return {
        send  : function (msg) {
            return sendMessage(socket, msg);
        },
        socket: socket
    }
}

module.exports = Sender;