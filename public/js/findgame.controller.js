/**
 * Created by Администратор on 01.09.15.
 */
(function() {
        'use strict';

        angular
            .module("gameApp")
            .controller("FindGameController", FindGameController);


        function FindGameController($http) {
            var vm = this;
            vm.connected = false;
            vm.finding = false;

            vm.connectStatus = "Connecting to server...";

            vm.findGame = function() {
                vm.checkConnection();
                vm.finding = true;
                $http.post('/find', {nick:vm.nickname})
                    .success(function(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        vm.connectStatus = "You are in lobby";
                        vm.connected = true;
                    })
                    .error(function(response) {
                        vm.connectStatus = "No server connection. Multiplayer disabled";
                        vm.connected = false;
                        vm.finding = false;
                    })
            };

            
            vm.checkConnection = function () {
                $http.get('/ping')
                    .success(function(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        vm.connectStatus = "Connected to  "+response;
                        vm.connected = true;
                    })
                    .error(function(response) {
                        vm.connectStatus = "No server connection. Multiplayer disabled";
                        vm.connected = false;
                    })
            };

            vm.checkConnection();



        }


    }
 )();