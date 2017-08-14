'Use Strict';
angular.module('App').controller('registerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Log" + JSON.stringify(user));        
         Utils.alertshow("Successful","The User was Successfully Created.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

 
    $scope.ous = ['Audit Services','Health & Safety','Customer Serive','Corp Comm','EIX','Eithics & Compliance', 'Finance','Government Affairs', 'Human Resources', 'Legal', 'Environmental Services', 'EPM/Generation', 'Reg Affairs & SIPP', 'Supply Chain','Transportation Services']
      


}
);
