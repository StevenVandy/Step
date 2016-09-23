'Use Strict';
angular.module('App').controller('leaderboardController', function (Auth, $state, $scope, StepLog, Admin, user, Utils, $q) { 

   
  $scope.ous = ['Audit Services','CEHS','Corp Comm','EIX','Eithics & Compliance', 'Finance','Government Affairs', 'Human Resources', 'Legal', 'EPM/Generation', 'Reg Affairs & SIPP', 'Edison Material Supply','Transportation Services'];

  $scope.avgs = [];

  Utils.show();

  var promises = []

  $scope.ous.forEach(function(ou){

    promises.push(StepLog.getEntriesByOu(ou).$loaded().then(function(entries){
      var ouTotal = 0;

      entries.forEach(function(entry){
        ouTotal += entry.steps;
      });

      return ouTotal;
    })
    .then(function(ouTotal){
      Admin.getUsersFromOu(ou).$loaded().then(function(profiles){
        var numOuUsers = profiles.length;

        $scope.avgs.push({ou: ou, ouAvg: ouTotal/numOuUsers});
      })
    }));

  });

    
  $q.all(promises).then(function(){
    console.log($scope.avgs)
    Utils.hide()
  })

  


  
});
