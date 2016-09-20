'Use Strict';
angular.module('App').controller('teamController', function (Auth, $state, $scope, StepLog, Admin, user) { 

  console.log(Admin)

  $scope.users = Admin.getUsersFromTeam(user.team);


  $scope.query = {};

 
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
