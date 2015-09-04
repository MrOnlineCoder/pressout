/**
 * Created by Администратор on 02.09.15.
 */
(function() {
    'use strict';
   
    angular
        .module("gameApp")
        .controller("MultiplayerController", MultiplayerController);


    function MultiplayerController($routeParams) {
        var vm = this;
        vm.settings = $routeParams;



    }


})();