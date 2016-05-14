# tcptools

## simple demo

```javascript
var net         = require('net');
var tcptools    = require('tcptools');
var path        = require('path');
var protobufjs  = require('protobufjs');
var TestProto = protobufjs.loadProtoFile(path.resolve(__dirname, "./test.proto"));

var TestMsg= AcMailProto.build("ACMOBA.Protocol.Test.TestMsg"),

var client = net.connect({
    host: 127.0.0.1,
    port: 2222
}, function () {
    console.log('connected to server!');
    var msgSender = tcptools.MessageSender(TestMsg, client);//获取指定消息的sender
    msgSender.send(msg); //发送数据
});

var msgReader = tcptools.MessageReader(TestMsg); //获取指定消息的reader
client.on('data', function (data) {
    var res = msgReader.read(data); //读取数据
    while (res) {
        console.log(res);
        res = msgReader.read(null);
        client.end();
    }
});

```
