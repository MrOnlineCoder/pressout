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

            vm.connectStatus = "Connecting to server...";


            $http.get('http://localhost:3000/ping').success(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    vm.connectStatus = "Connected.";
                })
        }


    }
 )();