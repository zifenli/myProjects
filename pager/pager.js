/**
 * Created by lizifen on 15/11/9.
 */
(function (angular) {
    angular.module('pagerModule', [])
        .controller('pagerCtrl', ['$scope', function ($scope) {
            function _getData(index){
                $http.get('api?index='+index).success(function(){
                    //渲染数据
                });
            }
            //总页面数是定的，根据总得页面数产生总的pager；pageCount;
            //当前页面，curPage,初始为1
            //pager=[
            // {page:1},
            // {page:2},
            // {page:3}...]
            $scope.curPage = 1;
            $scope.pageCount = 30;
            $scope.pager = [];
            $scope.pageArr = [];//length=8;

            //产生一组page数组：length＝8，根据curPage和pageCount
            //curPage在1和pageCount之间，当8-curPage的位置＝3时重新计算一组page数组
            //1,2,3,4,curPage,6,7,8
            function _generatePager(curPage) {

                for(var i = 0; i <8; i++){
                    $scope.pager[i] = {};

                    if (curPage - 4 > 0 && curPage + 3 < $scope.pageCount){
                        $scope.pager[i].page = curPage - 4+i;
                    }else if(curPage - 4<=0){
                         $scope.pager[i].page = i+1;
                    }else{
                        $scope.pager[i].page = $scope.pageCount-8+i;
                    }
                }

            }

            //直接选择页码
            $scope.changeCurPage = function (index) {
                $scope.curPage = index;
                _generatePager($scope.curPage);
            }
            //通过上一页下一页选择
            $scope.switchPage = function (offset) {
                var page = $scope.curPage + offset;
                //三种情况：1、curPage＝1；2、curPage＝pageCount；3、介于两者之间
                if (page < 1) {
                    $scope.curPage = 1;
                } else if (page > $scope.pageCount) {
                    $scope.curPage = $scope.pageCount;
                } else {
                    $scope.curPage = page;
                }
                _generatePager($scope.curPage);
            }
            if($scope.pageCount){
                _generatePager($scope.curPage);
            }


        }])
}(angular));
