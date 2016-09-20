angular.module('App').factory('Admin', function($firebaseArray, FURL, Auth){
  var ref = new Firebase(FURL+'profile');
  var Steps = $firebaseArray(ref);

  var Admin = {
    getUsersFromOu: function(ou){
      return $firebaseArray(ref.orderByChild('ou').equalTo(ou));
    },

    getUsersFromTeam: function(team){
      return $firebaseArray(ref.orderByChild('team').equalTo(team));
    }
  };


  return Admin;
});
