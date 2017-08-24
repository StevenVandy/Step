'Use Strict';
angular.module('App').controller('adminController', function (Auth, $state, $scope, StepLog, Admin, user) { 

  if(user.ouadmin){
    Admin.getUsersFromOu(user.ou).$loaded().then(function(users){
      $scope.users = users.sort(function(a, b){
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
          return 1;
        }
        if (a.firstname.toUpperCase() < b
          .firstname.toUpperCase()) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    });
  }

  
  $scope.ous = ['Audit Services','Health & Safety','Customer Service','Corp Comm','EIX','Ethics & Compliance', 'Finance','Information Technology', 'Human Resources', 'Legal', 'Environmental Services', 'EPM/Generation', 'Reg Affairs & SIPP', 'Supply Chain','Transportation Services'];

  $scope.query = {};

  $scope.onOuSelect = function(){
    Admin.getUsersFromOu($scope.query.ou).$loaded().then(function(users){
      $scope.users = users.sort(function(a, b){
        if (a.firstname.toUpperCase() > b.firstname.toUpperCase()) {
          return 1;
        }
        if (a.firstname.toUpperCase() < b.firstname.toUpperCase()) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    });
    // $scope.ouTotal = 0;

    // StepLog.getEntriesByOu($scope.query.ou).$loaded().then(function(entries){
    //   entries.forEach(function(entry){
    //     $scope.ouTotal += entry.steps;
    //   });
    // });


   // Admin.getUsersFromOu($scope.query.ou).$loaded().then(function(profiles){
   //    $scope.numOuUsers = profiles.length
   //  })

    // $scope.users.$loaded().then(function(users){
    //   users.forEach(function(stepUser){
    //     StepLog.getEntries(stepUser.id).$loaded().then(function(entries){
    //       entries.forEach(function(entry){
    //         $scope.userTotal += entry.steps;
    //       });
    //     });
    //   })
    // });
  };

  // window.migration = function(){
  //   StepLog.getAllEntries().$loaded().then(function(entries){
  //     entries.forEach(function(entry, i){
  //       Auth.getProfile(entry.userId).then(function(profile){
  //         entries[i].ou = profile.ou;

  //         entries.$save(i);
  //       });
  //     });
  //   });
  // }


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
