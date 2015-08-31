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
            .when('/multiplayer', {
                templateUrl: 'views/about.html'
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