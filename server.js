/**
 * Created by ������������� on 01.09.15.
 */
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
var staticServe = require("serve-static");
var path = require('path');


app.use(bodyParser.json()); // ����������� ������, ��� �������� JSON � ��������
//app.use(app.router); // ������ ��� �������� ������� ������������ �����
app.use(express.static(path.join(__dirname, 'public'))); // ������ ������������ ��������� �������, ������� ������� �� ����� public/ (� ����� ������ ������ index.html)


app.get('/ping', function (req, res) {
    res.end("Europe server");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
