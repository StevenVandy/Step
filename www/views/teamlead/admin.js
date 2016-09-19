'Use Strict';
angular.module('App').controller('adminController', function (Auth, $state, $scope, StepLog, Admin, user) { 

  if(user.teamadmin){
    $scope.users = Admin.getUsersFromOu(user.ou);
  }

  $scope.ous = ['Audit Services','CEHS','Corp Comm','EIX','Eithics & Compliance', 'Finance','Government Affairs', 'Human Resources', 'Legal', 'EPM/Generation', 'Reg Affairs & SIPP', 'Edison Material Supply','Transportation Services'];

  $scope.query = {};

  $scope.onOuSelect = function(){
    $scope.users = Admin.getUsersFromOu($scope.query.ou);
  };


  $scope.onUserSelect = function(){
    console.log($scope.query.user)
    $scope.users.forEach(function(user, i){
      if(angular.equals($scope.query.user, user)){
        $scope.userIndex = i;

      }
    });

    $scope.entries = StepLog.getEntries($scope.query.user.id);

    $scope.total = 0;

    $scope.entries.$loaded().then(function(){
      $scope.entries.forEach(function(entry){
        $scope.total += entry.steps;
      });
    });

    console.log($scope.userIndex);
  }

  $scope.selectNextUser = function(){
    
    if($scope.users.length > $scope.userIndex + 1){
      $scope.query.user = $scope.users[$scope.userIndex + 1];
    } else {
      $scope.query.user = $scope.users[0];
    }

    $scope.onUserSelect();
  }

  $scope.selectPreviousUser = function(){
    if(0 < $scope.userIndex){
      $scope.query.user = $scope.users[$scope.userIndex - 1];
    } else {
      $scope.query.user = $scope.users[$scope.users.length - 1];
    }

    $scope.onUserSelect();
  }
});
