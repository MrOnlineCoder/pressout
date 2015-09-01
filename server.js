/**
 * Created by Администратор on 01.09.15.
 */
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
var staticServe = require("serve-static");
var path = require('path');




app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
//app.use(app.router); // модуль для простого задания обработчиков путей
app.use(express.static(path.join(__dirname, 'public'))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


var players = [];


app.get('/ping', function (req, res) {
    res.end("Europe server");
});

app.post('/find', function (req, res) {
    players.push(req.body.nick);
    console.log("- Client is finding game: "+req.body.nick);
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
