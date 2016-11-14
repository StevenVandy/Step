angular.module('App').factory('Admin', function($firebaseArray, FURL, Auth, StepLog){
  var ref = new Firebase(FURL+'profile');

  var Admin = {
    getUsersFromOu: function(ou){
      return $firebaseArray(ref.orderByChild('ou').equalTo(ou));
    },

    getUsersFromTeam: function(team){
      return $firebaseArray(ref.orderByChild('team').equalTo(team));
    },

    calculateSteps: function(){
      $firebaseArray(ref).$loaded(function(profiles){
        profiles.forEach(function(profile){
          console.log(profile);
          StepLog.updateTotalSteps(profile.id);
        });
      });
    },
    renameOu: function(currentName){
      var newName = 'E&C and EIX';

      return Admin.getUsersFromOu(currentName).$loaded(function(profiles){
        angular.forEach(profiles, function(profile, i){
          profiles[i].ou = newName;
          profiles.$save(i);
        });
      });
    }
  };

  window.jakeadmin = Admin;

  return Admin;
});
