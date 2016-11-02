'Use Strict';
angular.module('App').controller('leaderboardController', function (Auth, $state, $scope, StepLog, Admin, user, Utils, $q) { 

   
  // $scope.ous = ['Audit Services','CEHS','Corp Comm','EIX','Eithics & Compliance', 'Finance','Government Affairs', 'Human Resources', 'Legal', 'EPM/Generation', 'Reg Affairs & SIPP', 'Edison Material Supply','Transportation Services'];

  // $scope.avgs = [];

  // $scope.user = user;

  // // Utils.show();

  // var promises = []

  // $scope.ous.forEach(function(ou){

  //   promises.push(Admin.getUsersFromOu(ou).$loaded().then(function(profiles){
  //     var numOuUsers = profiles.length;

  //     var ouTotal = 0;
  //     var numDupes = 0;

  //     profiles.forEach(function(profile){
  //       if(profile.steps){
  //         ouTotal += profile.steps;
  //       } else {
  //         numDupes += 1;
  //       }
  //     });

  //     $scope.avgs.push({ou: ou, ouAvg: ouTotal/(numOuUsers - numDupes)});

  //     if(user.ou == ou){
  //       $scope.ouProfiles = profiles;
  //       var groupedTeams = {};

  //       profiles.forEach(function(profile){
  //         if(profile.team === 'Empty' || !profile.steps){
  //           return;
  //         }

  //         if(!groupedTeams[profile.team]){
  //           groupedTeams[profile.team] = [];
  //         }

  //         groupedTeams[profile.team].push(profile);
  //       });

  //       $scope.teamTotals = [];
  //       console.log(groupedTeams);

  //       angular.forEach(groupedTeams, function(profiles, team){
  //         var total = 0;

  //         angular.forEach(profiles, function(profile){
  //           total += profile.steps;
  //         });

  //         $scope.teamTotals.push({team: team, total: total, avg: total/profiles.length});
  //       });

  //     }
  //   }));

  // });


  // promises.push(Auth.getTopProfiles().$loaded().then(function(profiles){
  //   return $scope.profiles = profiles;
  // }));


  // // $q.all(promises).then(function(){
  // //   console.log($scope.avgs)
  // //   Utils.hide()
  // // })

  


  
});
