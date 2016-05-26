/**
 * Created by lizifen on 15/12/7.
 */
angular.module('uiRouterTest.list',['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('users',{
                    url:'/users',
                    abstract:true,
                    templateUrl:'users.html'
                })
                .state('users.list',{
                    url:'',
                    templateUrl:'users.list.html'
                })
                .state('users.detail',{
                    url:'/2',
                    views:{
                        '':{templateUrl:'users.detail.html'},
                        'hint@':{
                            template:'hello,i am in you parent'
                        },
                        'menuTip':{
                            template:'hello,i am in you myself'
                        }
                    }
                });
    }]);
