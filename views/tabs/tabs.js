'Use Strict';
angular.module('App').controller('tabsController', function (Auth, $state, $scope, user) {
  $scope.user = user;

  $scope.logout = function() {
    Auth.logout();
    $state.go('login');
  };
});
