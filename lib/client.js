/********************************************************************
 * Copyright (C) 2015 上海魔霸网络科技有限公司. All Rights Reserved.
 *
 * @project tcpTools
 * @file WebStorm
 * @brief
 * @author wangyinchuan
 * @email wangyinchuan@7fgame.com
 * @date 2016/5/24
 *
 ********************************************************************
 */
var net    = require('net');

function client(opt) {
    var client = net.connect({
        host: opt.host,
        port: opt.port
    }, function () {
        console.info('connected to tcp://%s:%s', opt.host, opt.port);
    });

    client.on('data', function (data) {
        var res = msgReader.read(data);
        while (res) {
            cb(null, res);
            res = msgReader.read(null);
            client.end();
        }
    });

    client.on('error', function (err) {
        console.error('props client err:', err);
        cb(err, null);
    });

    client.on('end', function () {
        console.info('disconnected from props server');
    });
};