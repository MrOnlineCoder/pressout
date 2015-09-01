/**
 * Created by Администратор on 31.08.15.
 */
(function() {
    'use strict';
   
    angular
        .module("gameApp")
        .config(routeConfig);



    function routeConfig($routeProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl: 'views/welcome.html'
                //controller: 'MakeController',
                ///controllerAs: 'vm'
            })
            .when('/train', {
                templateUrl: 'views/train.html',
                controller: 'TrainController',
                controllerAs: 'vm'
            })
            .when('/setupTrain', {
                templateUrl: 'views/setupTrain.html',
                //controller: 'TrainController',
                //controllerAs: 'vm'
            })
            .when('/findGame', {
                templateUrl: 'views/findGame.html',
                controller: 'FindGameController',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: 'views/create2.html',
                controller: 'MakeClosedController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/welcome'
            });
    }
})();