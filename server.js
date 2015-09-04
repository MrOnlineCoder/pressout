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



var waiting = [];
var games = [];


var currentID = 0;

waiting.push("Alice");


function Game(pl1, pl2) {
    this.pl1 = pl1;
    this.pl2 = pl2;
    this.id = currentID;
}



app.get('/ping', function (req, res) {
    res.end("Europe server");
});

/*app.post('/find', function (req, res) {
    console.log("- Client connected to lobby list: "+req.body.nick);
    res.send(waiting);
    res.end();
});

app.post('/play', function(req, res) {
    game = new Game(req.body.gameOwner, req.body.nick);
    currentID++;
    games.push(game);
    res.send(game);
    res.end();
});*/



var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
io.on('connection', function(socket) {

    socket.on("get lobby", function(data){
            console.log("Client  is requesting lobby list: "+data.nick);
            socket.emit("lobbyed", waiting);
    });

    socket.on("create lobby", function(data){
            console.log("Created new lobby.");
            waiting.push(data.nick);
            socket.emit("created lobby", {created: true});
    });
    socket.on("remove lobby", function(data){
            console.log("Removed lobby.");
            for (var i=0; i<waiting.length;i++) {
                if (waiting[i] == data.nick) {
                    waiting.splice(i,1);
                }
            }
           // socket.emit("created lobby", {created: true});
    });

    socket.on("join lobby", function(data) {
        console.log("Game created. Lobbyer: "+data.lobbyer+" Joiner: "+data.nick);
        games.push(new Game(data.lobbyer, data.nick));
        for (var i=0; i<waiting.length;i++) {
            if (waiting[i] == data.lobbyer) {
                waiting.splice(i,1);
            }
        }
        io.sockets.emit("joined", {pl1: data.lobbyer, pl2: data.nick});
    });



});
