/*** Created by lasty on 2015/11/20.*/
var app = angular.module('myApp', []);
app.controller('MySQLCtrl', function($scope,$http){
    $scope.inLogid = '';
    $scope.inUsertimeline = '';
    $scope.inUsername = '';
    $scope.inUserBehave= '';

    $scope.edit = true;
    $scope.error = true;

    $scope.editUser = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.inUsertimeline = '';}
        else {
            $scope.edit = false;
            $scope.inUsertimeline = $scope.users[id-1].Name;}};

    function url2Callback(url){
        var host= "http://192.168.0.100:5000/api/user";
        return host + url;
    }

    $scope.showallusertimneline=function(){
        var url = "/showlog.json";
        url = url2Callback(url);
        $http.get(url)
            .success(function(resp){
                console.log(resp);
                $scope.usertimelinelogs = resp.logs;
            })
    };

    $scope.delBylogid=function(){
        var url = "/deletelog";
        url = url2Callback(url);
        $http.post(url,{logid:$scope.inLogid})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showallusertimneline();
                }
            })
    };

    $scope.delByuserid=function(){
        var url = "/deletelog";
        url = url2Callback(url);
        $http.post(url,{userid:$scope.inUsername})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showallusertimneline();
                }
            })
    };

    $scope.makelogText =function(){
        var url = "/makelog";
        url = url2Callback(url);
        $http.post(url,{userid:'test_user7',description:'1321654'})
            .success(function(resp){
                console.log(resp);
                $scope.showallusertimneline();
            })
    };

    $scope.showallusertimneline();

});