'Use Strict';
angular.module('App').controller('tabsController', function (Auth, $state, $scope, user) {
  $scope.user = user;

  console.log(user)

  $scope.teamornot = function(){
    if (user.team == 'Empty') {
     return "ng-hide";
    } else {
     return "ng-show";
    }
}

  $scope.logout = function() {
    Auth.logout();
    $state.go('login');
  };
});
