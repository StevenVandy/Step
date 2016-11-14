'Use Strict';
angular.module('App').controller('logstepsController', function ($scope, user, entries, StepLog, Auth, $state) {
  $scope.user = user;

  // var date = new Date();

  // $scope.stepLog = {
  //   date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
  //   steps: 10
  // };

  // $scope.entries = entries;
  // $scope.lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // $scope.findEntryIndexByDate = function(date){
  //   var index = -1;

  //   $scope.entries.forEach(function(entry, i){
  //     if(date.getTime() === entry.date){
  //       index = i;
  //     }
  //   })

  //   return index;
  // }

  // $scope.onDateSelect = function(){
  //   var index = $scope.findEntryIndexByDate($scope.stepLog.date);

  //   if(index !== -1){
  //     $scope.stepLog.steps = $scope.entries[index].steps
  //   }
  // };

  // $scope.calculate = function(){
  //   $scope.total = 0;
  //   $scope.distancemiles = 0;
  //   $scope.distancetoprize=0;

  //   $scope.entries.forEach(function(entry){
  //     if($scope.lastDate.getTime() < entry.date){
  //       $scope.lastDate = new Date(entry.date);
  //     }

  //     $scope.total += entry.steps;
     
  //   });

  //   if($scope.total > 0){
  //       $scope.distancemiles = $scope.total / 2000.0;
  //       $scope.distancetoprize = 425000 - $scope.total;
  //     };
  // };

  // $scope.onDateSelect();
  // $scope.calculate();

  // $scope.submitSteps = function(){
  //   if(!$scope.submitted){
  //     var index = $scope.findEntryIndexByDate($scope.stepLog.date);

  //     //$scope.submitted = true;

  //     if(index !== -1){
  //       $scope.entries[index].steps = parseInt($scope.stepLog.steps);
  //       console.log($scope.stepLog.steps);
  //       console.log($scope.entries[index].steps);
  //       $scope.entries.$save(index).then($scope.calculate);
  //       //console.log(entries);
  //     } else {
  //       StepLog.add($scope.stepLog).then($scope.calculate);
  //     }

  //     StepLog.updateTotalSteps(user.id);
  //   }
  // };

  // //var mindate = new date(2016,9,1,0,0,0,0);
  // //var maxdate = new date(2016,10,30,0,0,0,0);

  // $scope.minDate = new Date(2016,8,12,0,0,0,0);
  // $scope.maxDate = new Date(2016,9,23,0,0,0,0);

  // $scope.logOut = function () {
  //     Auth.logout();
  //     $state.go('login');
  // };

});
