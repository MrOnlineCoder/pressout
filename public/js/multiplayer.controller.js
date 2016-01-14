/**
 * Created by Администратор on 02.09.15.
 */
(function() {
    'use strict';
   
    angular
        .module("gameApp")
        .controller("MultiplayerController", MultiplayerController);


    function MultiplayerController($routeParams, $scope) {
        var vm = this;
        vm.time = 10;
        vm.settings = $routeParams;
        var socket;
        if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
            socket = io.connect('http://localhost:3000', {'transports': ['xhr-polling']});
        } else {
            socket = io.connect('http://localhost:3000');
        }

        socket.on("timed", function(data) {
            console.log("Time accepted from server.");
            if (data.lob == vm.settings.pl1 ||data.lob == vm.settings.pl2 ) {
                vm.time = data.time;
                console.log("Time: "+vm.time);
                $scope.$apply();
                startCountdown();
            }
        });


        function startCountdown() {
            if (vm.time > 0) {
                vm.time--;
                $scope.$apply();
                setTimeout(startCountdown,1000);

            }

        }



        socket.emit("get time", {lobby: vm.settings.pl1});

    }


})();