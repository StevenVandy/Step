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
    }
  };

  window.jakeadmin = Admin;

  return Admin;
});
