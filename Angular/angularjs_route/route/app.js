/**
 * Created by lizifen on 15/12/7.
 */
angular.module('uiRouterTest',['ui.router','uiRouterTest.list'])
    .run(['$rootScope','$state','$stateParams',
        function($rootScope,$state,$stateParams){
            $rootScope.$state=$state;
            $rootScope.$stateParams = $stateParams;
    }])
    .config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider){
            $urlRouterProvider
                .when('/list?id','/list/:id')
                .otherwise('/');
             $stateProvider
                .state('home',{
                    url:'/',
                    template:'<h3>Welcome to home!</h3>'
                })
                 .state('about',{
                     url:'/about',
                     template:'<h3>Welcome to about page!</h3>'
                 });
    }]);