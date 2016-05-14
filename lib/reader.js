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
var _      = require('lodash');

function Reader(opt) {
    var headerSize = defOpt.HEADER_SEZI;
    if (opt) {
        if (opt.headerSize) {
            headerSize = opt.headerSize;
        }
    }
    return {
        read_buffer: new Buffer(0),
        read       : function (data) {
            if (data) {
                this.read_buffer = Buffer.concat([this.read_buffer, data]);
            }
            var request = null;

            if (this.read_buffer.length > headerSize) {
                var msg_len = this.read_buffer.readUInt32LE(0);

                if (this.read_buffer.length >= msg_len) {
                    var msg = new Buffer(msg_len - headerSize);
                    this.read_buffer.copy(msg, 0, headerSize, msg_len);

                    request = _.cloneDeep(msg);

                    msg              = this.read_buffer;
                    this.read_buffer = new Buffer(msg.length - msg_len);
                    msg.copy(this.read_buffer, 0, msg_len, msg.length);
                }
            }
            return request;
        }
    }
}

module.exports = Reader;