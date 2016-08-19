'Use Strict';
angular.module('App').controller('adminController', function (Auth, $state, $scope, StepLog, Admin) { 
  $scope.ous = ['T&D', 'SIPP','Customer Service','Reg Affairs','IT'];

  $scope.query = {};

  $scope.onOuSelect = function(){
    $scope.users = Admin.getUsersFromOu($scope.query.ou);
  };


  $scope.onUserSelect = function(){
    console.log($scope.query.user)
    $scope.entries = StepLog.getEntries($scope.query.user.id);

    $scope.total = 0;

    $scope.entries.$loaded().then(function(){
      $scope.entries.forEach(function(entry){
        $scope.total += entry.steps;
      });
    });
  }
});
