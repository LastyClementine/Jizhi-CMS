/*** Created by lasty on 2015/11/20.*/
var app = angular.module('myApp', []);
app.controller('MySQLCtrl', function($scope,$http){
    $scope.inName = '';
    $scope.inPassword = '';
    $scope.inPhoneNum = '';
    $scope.inAuthority = '';

    $scope.edit = true;
    $scope.error = true;
    $scope.incomplete = true;


    function url2Callback(url){
        var host= "http://192.168.0.100:5000/api/user";
        return host + url;
    }

    $scope.showall=function(){ //显示列表
        var url = "/showall.json";
        url = url2Callback(url);
        $http.get(url)
            .success(function(resp){
                console.log(resp);
                $scope.user = resp.users;
            })
    };
    $scope.showall();


    $scope.adduser=function(){  //添加用户
        var url = "/create";
        url = url2Callback(url);
        $http.post(url,{username:$scope.inName,password:$scope.inPassword,phonenumber:$scope.inPhoneNum,priority:$scope.inAuthority})
            .success(function(resp){
                console.log(resp);
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showall();
                }
            })
    };


    $scope.deluser=function(delusername){  //删除用户
        var url = "/delete";
        url = url2Callback(url);
        $http.post(url,{username:delusername})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showall();
                }
            })
    };

    $scope.updateuser=function(){  //修改用户信息
        var url = "/update";
        url = url2Callback(url);
        $http.post(url,{username:delusername})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showall();
                }
            })
    };


    $scope.editUser = function(v,w,x,y,z) {
        if (v == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.inName = '';
            $scope.inPassword = '';
            $scope.inPhoneNum = '';
            $scope.inAuthority = '';}
        else
        {
            $scope.edit = false;
            $scope.inName = w;
            $scope.inPassword = x;
            $scope.inPhoneNum = y;
            $scope.inAuthority = z}};





    $scope.showall();

});