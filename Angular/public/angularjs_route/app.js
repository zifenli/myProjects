var myApp = angular.module('myApp',['ngRoute']);
myApp.config(['$routeProvider',function ($routeProvider) {
      $routeProvider
      .when('/list', {
        templateUrl: 'list.html',
        controller: 'RouteListCtl'
      })
      .when('/list/:id', {
          templateUrl: 'detail.html',
          controller: 'RouteDetailCtl'
      })
      .otherwise({
        redirectTo: '/list'
      });
}]);
/*创建一个服务:四种方式
1,$provider;2,module的factory;3,module的service
var myApp=angular.module('myApp',[],function($provider){
  $provider.factory('remoteData',function(){
    var data={name:'n',value:'v'};
    return data;
  });
});
myApp.factory('remoteData',function(){
  var data={name:'n';value:'v'};
  return data;
});
myApp.service('remoteData',function(){
  this.name="n";
  this.value="v";
})*/

//模拟远程数据服务
myApp.factory('remoteData',function(){
  var data={name:'name',value:'lizifen'};
  return data;
});
//验证数据
myApp.factory('validate',['remoteData',function(remoteDataService){
  return function(){
    var validate=0;
    if(remoteDataService.name=="name"){
        validate=1;

    }
    return validate;
  }
}]);

myApp.factory('userService',function($http){
  var doGetUser=function(path){
     //远程访问
     // return $http({
     //  method:'POST',
     //  data:data,
     //  url:path
     // });
    //此处手动添加数据
    var data={person:[{userid:"1",username:'lzf',userinfo:'lizifen1'},
                      {userid:"2",username:'zfl',userinfo:'lizifen2'},
                      {userid:"3",username:'fzl',userinfo:'lizifen3'},
                      {userid:"4",username:'bzd',userinfo:'no idea'}]};
    return data;
  };
  return{ 
    getUser:function(){
      return doGetUser("http://mm.qingchengfit.cn/api/tickets/10/");
    }
  };
});
/*自定义指令*/
myApp.directive('userInfo',function(){
  return{
    restrit:'E',//用作标签
    templateUrl:'userInfoTemplate.html',//模板内容为ng-template定义ID为userInfoTemplate.html的内容
    replace:false,//用模板替换当前标签
    transclude:true,//将当前内容转移到模板中
    scope:{
      mytitle:'=etitle'
    },//定义了一个名为mytitle的MODEL，其值指向当前元素的etitle
    link:function(scope,element,attrs){//指定所包含的行为
      scope.mytitle="hello";
      scope.title="个人简介";
    scope.mytext="大家好";
      
      scope.showText=false;
      scope.toggleText=function(){
        scope.showText=!scope.showText;
      }
    }
  }
});
//自定义过滤器
myApp.filter('flFullname',function(){
  return function(user,sep){
      sep=sep||" ";
      user=user||{};
      fullName="";
      if(user.firstName){fullName+=user.firstName;}
      if(user.lastName){fullName=fullName+sep+user.lastName;}
      if(fullName&&fullName.length>0){return fullName;}
      else{return "";}
  };
});
myApp.directive('clickable', function() {

return {
  restrict: "E",
  scope: {
    foo: '=',
    bar: '='
  },
  template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
  link: function(scope, element, attrs) {
    scope.foo=0;
    scope.bar=0;
    element.click=function() {
      scope.apply(function(){
        scope.foo++;
        scope.bar++;
      })
    }
  }
}
});
myApp.directive('myDirective', function() {
    return {
        restrict: 'A',
        scope: {
          myfn: '&' 
        },
        priority: 100,
        template: "<div ng-click='myfn(hello)'>Inside myDirective</div>"
    };
});































