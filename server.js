/**
 * Created by Администратор on 01.09.15.
 */
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
var staticServe = require("serve-static");
var path = require('path');


app.use(bodyParser.json()); // стандартный модуль, для парсинга JSON в запросах
//app.use(app.router); // модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname, 'public'))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


app.get('/ping', function (req, res) {
    res.end("Europe server");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
