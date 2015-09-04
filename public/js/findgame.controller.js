/**
 * Created by Администратор on 01.09.15.
 */
(function() {
        'use strict';

        angular
            .module("gameApp")
            .controller("FindGameController", FindGameController);


        function FindGameController($timeout) {
            var vm = this;
            var socket;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                socket = io.connect('http://localhost:3000', {'transports': ['xhr-polling']});
            } else {
                socket = io.connect('http://localhost:3000');
            }
           // var socket = io.connect("http://localhost:3000");
            vm.iswaiting = false;
            vm.lobbies = [];
            vm.issetup = false;
            vm.connectStatus = "Connected to EU";




            socket.on("connect",function() {
                socket.on("lobbyed", function(data) {
                    vm.lobbies = data;
                });

                socket.on("created lobby", function(data) {
                    vm.iswaiting = true;
                });

                socket.on("joined", function(data) {
                    vm.statusText = "Opponent connected. Redirecting to game server...";
                    location.href="#multiplayer?pl1="+data.pl1+"&pl2="+data.pl2;
                });
            });

            vm.createLobby = function() {
                socket.emit("create lobby", {nick: vm.nickname});
                vm.iswaiting = true;
            };

            vm.getLobbies = function() {
                socket.emit("get lobby", {nick: vm.nickname});
            };

            vm.cancelLobby = function() {
                vm.iswaiting = false;
                vm.issetup = true;
                socket.emit("remove lobby", {nick: vm.nickname});

            };

            vm.setupGame = function() {
                if (vm.nickname != "" && vm.nickname.length > 3) {
                    vm.issetup = true;
                    $timeout(vm.getLobbies, 1000);
                }
            };

            vm.joinLobby = function(idx) {
                socket.emit("join lobby",{nick: vm.nickname, lobbyer:vm.lobbies[idx]});
            };

            vm.refreshList = function() {
                vm.getLobbies();
            };


            window.addEventListener("beforeunload", function() {
                    vm.cancelLobby();
            });

        }

    }
 )();